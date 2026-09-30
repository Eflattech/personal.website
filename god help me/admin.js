const seedOrders = [
  { id: "#EF-1048", customer: "Adaeze Okonkwo", date: "28 Sep 2026", amount: 399000, status: "Processing" },
  { id: "#EF-1047", customer: "Chinedu Eze", date: "28 Sep 2026", amount: 780000, status: "Delivered" },
  { id: "#EF-1046", customer: "Fatima Bello", date: "27 Sep 2026", amount: 465000, status: "Processing" },
  { id: "#EF-1045", customer: "Tunde Afolabi", date: "27 Sep 2026", amount: 38000, status: "Delivered" },
  { id: "#EF-1044", customer: "Emeka Nwosu", date: "26 Sep 2026", amount: 210000, status: "Cancelled" },
];

const products = [
  { name: "Samsung Galaxy A55 5G", category: "Phones & tablets", price: 399000, stock: 14 },
  { name: "Apple iPhone 13 128GB", category: "Phones & tablets", price: 680000, stock: 8 },
  { name: "HP ProBook 450 G9", category: "Computers", price: 780000, stock: 22 },
  { name: "LG 55 inch 4K Smart TV", category: "Electronics", price: 465000, stock: 4 },
  { name: "Infinix Note 40 Pro", category: "Phones & tablets", price: 165000, stock: 17 },
];

const money = new Intl.NumberFormat("en-NG");
const API_BASE = "/api";
const state = { products: [...products], orders: [], bookings: [] };
const $ = (selector) => document.querySelector(selector);

function liveOrders() {
  return state.orders;
}

function allOrders() {
  return [...liveOrders(), ...seedOrders];
}

function liveBookings() {
  return state.bookings;
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}

function price(value) { return `₦${money.format(value)}`; }
function statusClass(status) { return status.toLowerCase(); }
function showToast(message) {
  const toast = $("#adminToast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function orderRow(order, withAction = false) {
  return `<tr><td>${order.id}</td><td>${order.customer}</td><td>${order.date}</td><td>${price(order.amount)}</td><td><span class="status ${statusClass(order.status)}">${order.status}</span></td>${withAction ? `<td><button class="text-button order-action" data-order="${order.id}" type="button">Manage</button></td>` : ""}</tr>`;
}

function renderOrders() {
  const orders = allOrders();
  $("#recentOrders").innerHTML = orders.slice(0, 4).map((order) => orderRow(order)).join("");
  $("#ordersTable").innerHTML = orders.map((order) => orderRow(order, true)).join("");
  updateSummary(orders);
}

function updateSummary(orders = allOrders()) {
  const live = liveOrders();
  const statValues = document.querySelectorAll(".stat-card strong");
  if (statValues[0]) statValues[0].textContent = price(4286500 + live.reduce((sum, order) => sum + order.amount, 0));
  if (statValues[1]) statValues[1].textContent = 126 + live.length;
  if (statValues[2]) statValues[2].textContent = money.format(1842 + new Set(live.map((order) => order.customer)).size);
  if (statValues[3]) statValues[3].textContent = 243 + state.products.length;
}

function renderProducts() {
  const query = $("#productSearch").value.trim().toLowerCase();
  const filter = $("#stockFilter").value;
  const visible = state.products.filter((product) => {
    const matchesQuery = !query || `${product.name} ${product.category}`.toLowerCase().includes(query);
    const matchesStock = filter === "all" || product.stock < 10;
    return matchesQuery && matchesStock;
  });
  $("#productsTable").innerHTML = visible.map((product, index) => `<tr><td>${product.name}</td><td>${product.category}</td><td>${price(product.price)}</td><td>${product.stock}</td><td><span class="status ${product.stock < 10 ? "processing" : "delivered"}">${product.stock < 10 ? "Low stock" : "In stock"}</span></td><td><button class="text-button edit-product" data-product-index="${index}" type="button">Edit</button></td></tr>`).join("") || `<tr><td colspan="6">No products match this search.</td></tr>`;
  updateSummary();
}

function renderServices() {
  const bookings = liveBookings();
  const section = $("#servicesView .empty-feature");
  if (!bookings.length) return;
  section.className = "panel table-panel";
  section.innerHTML = `<div class="panel-heading"><div><p class="kicker">LIVE BOOKINGS</p><h3>Recent service requests</h3></div></div><div class="table-scroll"><table><thead><tr><th>Booking</th><th>Service</th><th>Customer</th><th>Date</th><th>Status</th></tr></thead><tbody>${bookings.map((booking) => `<tr><td>${booking.id}</td><td>${booking.service}</td><td>${booking.customer}</td><td>${booking.date}</td><td><span class="status processing">${booking.status}</span></td></tr>`).join("")}</tbody></table></div>`;
}

async function loadData(showUpdate = false) {
  try {
    const [dashboardData, productsData] = await Promise.all([apiRequest("/dashboard"), apiRequest("/products")]);
    state.orders = dashboardData.orders;
    state.bookings = dashboardData.bookings;
    state.products = productsData.products;
    renderOrders();
    renderProducts();
    renderServices();
    if (showUpdate) showToast("Customer activity updated");
  } catch (error) {
    showToast(`Backend unavailable: ${error.message}`);
  }
}

function showView(view) {
  document.querySelectorAll(".admin-view").forEach((section) => section.classList.toggle("active-view", section.dataset.page === view));
  document.querySelectorAll(".admin-nav a").forEach((link) => link.classList.toggle("active", link.dataset.view === view));
  const titles = { dashboard: "Good morning, Eflat.", products: "Product catalogue", orders: "Order management", customers: "Your customers", services: "Service bookings" };
  $("#viewTitle").textContent = titles[view] || titles.dashboard;
  $("#sidebar").classList.remove("open");
}

document.querySelectorAll(".admin-nav a").forEach((link) => link.addEventListener("click", () => showView(link.dataset.view)));
document.querySelectorAll("[data-view-link]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.viewLink)));
$("#menuToggle").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
$("#productSearch").addEventListener("input", renderProducts);
$("#stockFilter").addEventListener("change", renderProducts);
$("#salesPeriod").addEventListener("change", (event) => showToast(`Sales chart updated to ${event.target.value.toLowerCase()}`));
$("#notificationButton").addEventListener("click", () => showToast("You have 3 new admin notifications"));
$("#activityButton").addEventListener("click", () => showView("orders"));
$("#customerMessageButton").addEventListener("click", () => showToast("Customer messaging is ready for backend connection"));
$("#orderFilterButton").addEventListener("click", () => showToast("Showing all orders"));
$("#serviceFilterButton").addEventListener("click", () => showToast("Showing all service bookings"));
$("#exportButton").addEventListener("click", () => showToast("Report export prepared for download"));
$("#signOutButton").addEventListener("click", () => showToast("Connect this button to your secure auth provider"));
window.setInterval(() => loadData(true), 10000);

$("#addProductButton").addEventListener("click", () => $("#productDialog").showModal());
$("#closeProductDialog").addEventListener("click", () => $("#productDialog").close());
$("#productForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  try {
    const result = await apiRequest("/products", { method: "POST", body: JSON.stringify({ name: data.get("name"), category: data.get("category"), price: Number(data.get("price")), stock: Number(data.get("stock")) }) });
    state.products.unshift(result.product);
    renderProducts();
    $("#productMessage").textContent = "Product added to the catalogue.";
    event.currentTarget.reset();
    setTimeout(() => $("#productDialog").close(), 700);
    showToast("Product added successfully");
  } catch (error) {
    $("#productMessage").textContent = error.message;
  }
});

document.addEventListener("click", (event) => {
  const orderButton = event.target.closest(".order-action");
  const editButton = event.target.closest(".edit-product");
  if (orderButton) showToast(`${orderButton.dataset.order} opened for management`);
  if (editButton) showToast("Product editing is ready for backend connection");
});

renderOrders();
renderProducts();
renderServices();
loadData();
