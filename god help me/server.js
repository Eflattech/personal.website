const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const PORT = Number(process.env.PORT) || 8000;
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, "data", "store.json");
const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function readStore() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeStore(store) {
  fs.writeFileSync(DATA_FILE, `${JSON.stringify(store, null, 2)}\n`);
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) request.destroy();
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Request body must be valid JSON."));
      }
    });
    request.on("error", reject);
  });
}

function dashboard(store) {
  const sales = store.orders.reduce((total, order) => total + order.amount, 0);
  return {
    sales,
    orderCount: store.orders.length,
    customerCount: new Set(store.orders.map((order) => order.customer)).size,
    productCount: store.products.length,
    lowStockCount: store.products.filter((product) => product.stock < 10).length,
    orders: store.orders.slice(0, 20),
    bookings: store.bookings.slice(0, 20),
  };
}

async function handleApi(request, response, url) {
  const store = readStore();
  const route = url.pathname;

  if (request.method === "GET" && route === "/api/products") {
    return sendJson(response, 200, { products: store.products });
  }
  if (request.method === "GET" && route === "/api/orders") {
    return sendJson(response, 200, { orders: store.orders });
  }
  if (request.method === "GET" && route === "/api/dashboard") {
    return sendJson(response, 200, dashboard(store));
  }
  if (request.method === "GET" && route === "/api/bookings") {
    return sendJson(response, 200, { bookings: store.bookings });
  }

  if (request.method === "POST" && route === "/api/orders") {
    const body = await readBody(request);
    if (!Array.isArray(body.items) || body.items.length === 0) return sendJson(response, 400, { error: "At least one order item is required." });
    const amount = body.items.reduce((total, item) => total + Number(item.price || 0), 0);
    if (!Number.isFinite(amount) || amount <= 0) return sendJson(response, 400, { error: "Order amount must be greater than zero." });
    const order = {
      id: `EF-${Date.now().toString().slice(-8)}`,
      customer: String(body.customer || "Online customer").slice(0, 100),
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      amount,
      status: "Processing",
      items: body.items.map((item) => String(item.name).slice(0, 120)),
    };
    store.orders.unshift(order);
    writeStore(store);
    return sendJson(response, 201, { order });
  }

  if (request.method === "POST" && route === "/api/bookings") {
    const body = await readBody(request);
    if (!body.service || !body.customer || !body.phone || !body.date) return sendJson(response, 400, { error: "Service, customer, phone, and date are required." });
    const booking = {
      id: `BK-${Date.now().toString().slice(-8)}`,
      service: String(body.service).slice(0, 120),
      customer: String(body.customer).slice(0, 100),
      phone: String(body.phone).slice(0, 30),
      date: String(body.date).slice(0, 30),
      status: "New request",
    };
    store.bookings.unshift(booking);
    writeStore(store);
    return sendJson(response, 201, { booking });
  }

  if (request.method === "POST" && route === "/api/products") {
    const body = await readBody(request);
    const price = Number(body.price);
    const stock = Number(body.stock);
    if (!body.name || !body.category || !Number.isFinite(price) || !Number.isFinite(stock)) return sendJson(response, 400, { error: "Name, category, price, and stock are required." });
    const product = { name: String(body.name).slice(0, 120), category: String(body.category).slice(0, 80), price, stock };
    store.products.unshift(product);
    writeStore(store);
    return sendJson(response, 201, { product });
  }

  return sendJson(response, 404, { error: "API route not found." });
}

function serveStatic(response, pathname) {
  const requestedPath = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  const filePath = path.resolve(ROOT, requestedPath);
  if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return sendJson(response, 404, { error: "File not found." });
  response.writeHead(200, { "Content-Type": MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(response);
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  try {
    if (url.pathname.startsWith("/api/")) await handleApi(request, response, url);
    else serveStatic(response, url.pathname);
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "Internal server error." });
  }
});

server.listen(PORT, () => console.log(`Eflat backend running at http://localhost:${PORT}`));
