const categories = [
  { name: "Phones & tablets", slug: "phones", image: "img/category-phones-tablets.png" },
  { name: "Computers", slug: "computers", image: "img/category-computers-laptops.png" },
  { name: "Electronics", slug: "electronics", image: "img/category-electronics.png" },
  { name: "Home & kitchen", slug: "home", image: "img/category-home-kitchen.png" },
  { name: "Fashion", slug: "fashion", image: "img/category-fashion.png" },
  { name: "Beauty", slug: "beauty", image: "img/category-beauty.png" },
  { name: "Gaming", slug: "gaming", image: "img/category-gaming.png" },
];

const products = [
  { name: "Samsung Galaxy A55 5G", brand: "Samsung", category: "phones", price: 399000, oldPrice: 450000, rating: "4.6", reviews: 138, image: "img/category-phones-tablets.png", badge: "-11%", sections: ["featured", "sale"] },
  { name: "Apple iPhone 13 128GB", brand: "Apple", category: "phones", price: 680000, rating: "4.8", reviews: 96, image: "img/category-phones-tablets.png", sections: ["featured"] },
  { name: "HP ProBook 450 G9", brand: "HP", category: "computers", price: 780000, oldPrice: 850000, rating: "4.7", reviews: 64, image: "img/category-computers-laptops.png", badge: "-8%", sections: ["featured", "sale"] },
  { name: "LG 55 inch 4K Smart TV", brand: "LG", category: "electronics", price: 465000, oldPrice: 520000, rating: "4.7", reviews: 45, image: "img/category-electronics.png", badge: "-11%", sections: ["featured", "sale"] },
  { name: "Infinix Note 40 Pro", brand: "Infinix", category: "phones", price: 165000, oldPrice: 185000, rating: "4.3", reviews: 74, image: "img/category-phones-tablets.png", badge: "-11%", sections: ["sale"] },
  { name: "Sony WH-1000XM5 Headphones", brand: "Sony", category: "electronics", price: 310000, oldPrice: 345000, rating: "4.9", reviews: 82, image: "img/category-electronics.png", badge: "-10%", sections: ["sale"] },
  { name: "Tecno Camon 30", brand: "Tecno", category: "phones", price: 210000, rating: "4.4", reviews: 52, image: "img/category-phones-tablets.png", badge: "New", sections: ["new"] },
  { name: "Lenovo ThinkPad E14", brand: "Lenovo", category: "computers", price: 920000, rating: "4.8", reviews: 41, image: "img/category-computers-laptops.png", badge: "New", sections: ["new"] },
  { name: "Anker 20000mAh Power Bank", brand: "Anker", category: "electronics", price: 38000, rating: "4.5", reviews: 112, image: "img/category-electronics.png", badge: "New", sections: ["new"] },
  { name: "Hydrating Vitamin C Serum", brand: "Eflat Naturals", category: "beauty", price: 14000, rating: "4.8", reviews: 66, image: "img/category-beauty.png", badge: "New", sections: ["new"] },
];

const services = [
  { icon: "⌁", name: "Phone & laptop screen repair", description: "Certified technicians, 30-day service warranty", price: "From ₦15,000" },
  { icon: "⌂", name: "Home AC installation", description: "Installation, gas top-up and servicing", price: "From ₦25,000" },
  { icon: "✦", name: "Full home cleaning service", description: "Deep-cleaning for homes and offices", price: "From ₦20,000" },
];

const savedCart = JSON.parse(localStorage.getItem("eflatCart") || "[]");
const savedWishlist = JSON.parse(localStorage.getItem("eflatWishlist") || "[]");
const state = { cart: savedCart, wishlist: new Set(savedWishlist), activeFilter: "all" };
const money = new Intl.NumberFormat("en-NG");
const API_BASE = "/api";

const elements = {
  categoryGrid: document.querySelector("#categoryGrid"),
  featuredGrid: document.querySelector("#featuredGrid"),
  saleGrid: document.querySelector("#saleGrid"),
  newGrid: document.querySelector("#newGrid"),
  serviceGrid: document.querySelector("#serviceGrid"),
  cartCount: document.querySelector("#cartCount"),
  wishlistCount: document.querySelector("#wishlistCount"),
  toast: document.querySelector("#toast"),
  cartPanel: document.querySelector("#cartPanel"),
  wishlistPanel: document.querySelector("#wishlistPanel"),
  cartItems: document.querySelector("#cartItems"),
  wishlistItems: document.querySelector("#wishlistItems"),
  cartTotal: document.querySelector("#cartTotal"),
  bookingDialog: document.querySelector("#bookingDialog"),
  bookingTitle: document.querySelector("#bookingTitle"),
};

function formatPrice(price) {
  return `₦${money.format(price)}`;
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

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => elements.toast.classList.remove("show"), 2600);
}

function productCard(product) {
  const loved = state.wishlist.has(product.name);
  return `<article class="product-card" data-product="${product.name.toLowerCase()}">
    <div class="product-image-wrap">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
      <button class="wishlist-toggle ${loved ? "is-loved" : ""}" data-wishlist="${product.name}" type="button" aria-label="${loved ? "Remove from" : "Add to"} wishlist">${loved ? "♥" : "♡"}</button>
      <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
    </div>
    <div class="product-meta">
      <p class="product-brand">${product.brand}</p>
      <h3 class="product-name">${product.name}</h3>
      <div class="rating" aria-label="${product.rating} out of 5 stars">★★★★★ <span>${product.rating} (${product.reviews})</span></div>
      <div class="product-bottom"><div class="price">${formatPrice(product.price)} ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ""}</div><button class="add-button" data-cart="${product.name}" type="button">Add to cart</button></div>
    </div>
  </article>`;
}

function renderCategories() {
  elements.categoryGrid.innerHTML = categories.map((category) => `<button class="category-card" data-category="${category.slug}" type="button"><img src="${category.image}" alt="${category.name}" loading="lazy"><span>${category.name}</span></button>`).join("");
}

function renderProducts(query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  const matches = (product) => {
    const matchesFilter = state.activeFilter === "all" || product.category === state.activeFilter;
    const matchesSearch = !normalizedQuery || `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesSearch;
  };
  const visible = products.filter(matches);
  const renderSection = (id, section) => {
    const sectionProducts = visible.filter((product) => product.sections.includes(section));
    document.querySelector(`#${id}`).innerHTML = sectionProducts.length ? sectionProducts.map(productCard).join("") : `<p class="empty-state">No products found here yet. Try another search.</p>`;
  };
  renderSection("featuredGrid", "featured");
  renderSection("saleGrid", "sale");
  renderSection("newGrid", "new");
}

function renderServices() {
  elements.serviceGrid.innerHTML = services.map((service) => `<article class="service-card"><div class="service-icon">${service.icon}</div><h3>${service.name}</h3><p>${service.description}</p><a href="#top" data-service="${service.name}">${service.price} &nbsp; Book now →</a></article>`).join("");
}

function updateCounts() {
  elements.cartCount.textContent = state.cart.length;
  elements.wishlistCount.textContent = state.wishlist.size;
}

function saveCustomerState() {
  localStorage.setItem("eflatCart", JSON.stringify(state.cart));
  localStorage.setItem("eflatWishlist", JSON.stringify([...state.wishlist]));
}

async function saveOrder() {
  return apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify({ customer: "Online customer", items: state.cart }),
  });
}

async function saveServiceBooking(name, phone, date) {
  return apiRequest("/bookings", {
    method: "POST",
    body: JSON.stringify({ service: elements.bookingTitle.textContent, customer: name, phone, date }),
  });
}

function renderPanels() {
  elements.cartItems.innerHTML = state.cart.length ? state.cart.map((product, index) => `<div class="panel-item"><img src="${product.image}" alt="${product.name}"><div><h3>${product.name}</h3><p>${product.brand} · Qty 1</p></div><div><strong>${formatPrice(product.price)}</strong><button class="remove-item" data-remove-cart="${index}" type="button" aria-label="Remove ${product.name}">×</button></div></div>`).join("") : `<p class="panel-empty">Your cart is empty. Add something you love.</p>`;
  elements.wishlistItems.innerHTML = state.wishlist.size ? products.filter((product) => state.wishlist.has(product.name)).map((product) => `<div class="panel-item"><img src="${product.image}" alt="${product.name}"><div><h3>${product.name}</h3><p>${product.brand}</p></div><div><strong>${formatPrice(product.price)}</strong><button class="remove-item" data-remove-wishlist="${product.name}" type="button" aria-label="Remove ${product.name}">×</button></div></div>`).join("") : `<p class="panel-empty">Your wishlist is empty. Save products with the heart button.</p>`;
  elements.cartTotal.textContent = formatPrice(state.cart.reduce((total, product) => total + product.price, 0));
}

function openPanel(panel) {
  document.querySelectorAll(".side-panel").forEach((item) => item.classList.remove("is-open"));
  panel.classList.add("is-open");
  document.body.classList.add("panel-open");
  panel.setAttribute("aria-hidden", "false");
}

function closePanels() {
  document.querySelectorAll(".side-panel").forEach((panel) => {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
  });
  document.body.classList.remove("panel-open");
}

function openBooking(serviceName) {
  elements.bookingTitle.textContent = serviceName;
  elements.bookingDialog.showModal();
}

function handleSearch(event) {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  const query = input.value;
  state.activeFilter = "all";
  renderProducts(query);
  document.querySelector("#featured").scrollIntoView({ behavior: "smooth" });
  showToast(query ? `Showing results for “${query}”` : "Showing all featured products");
}

document.querySelector("#searchForm").addEventListener("submit", handleSearch);
document.querySelector("#mobileSearchForm").addEventListener("submit", handleSearch);
document.querySelector("#menuToggle").addEventListener("click", (event) => {
  const isOpen = document.body.classList.toggle("menu-open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
  event.currentTarget.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});
document.querySelectorAll("#mainNav a").forEach((link) => link.addEventListener("click", () => document.body.classList.remove("menu-open")));
document.querySelector("#wishlistButton").addEventListener("click", () => openPanel(elements.wishlistPanel));
document.querySelector("#cartButton").addEventListener("click", () => openPanel(elements.cartPanel));
document.querySelectorAll("[data-close-panel]").forEach((button) => button.addEventListener("click", closePanels));
document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => elements.bookingDialog.close()));
document.querySelector("#checkoutButton").addEventListener("click", async () => {
  if (!state.cart.length) return showToast("Your cart is empty");
  try {
    await saveOrder();
    state.cart = [];
    saveCustomerState();
    updateCounts();
    renderPanels();
    closePanels();
    showToast("Order placed successfully. Eflat will confirm it shortly.");
  } catch (error) {
    showToast(error.message);
  }
});
document.querySelector("#bookingForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  try {
    await saveServiceBooking(formData.get("name"), formData.get("phone"), formData.get("date"));
    document.querySelector("#bookingMessage").textContent = "Request received. We will call you shortly.";
    event.currentTarget.reset();
  } catch (error) {
    document.querySelector("#bookingMessage").textContent = error.message;
  }
});
document.querySelector("#newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#emailInput").value;
  document.querySelector("#formMessage").textContent = `You're on the list, ${email}.`;
  event.currentTarget.reset();
});

document.addEventListener("click", (event) => {
  const cartButton = event.target.closest("[data-cart]");
  const wishlistButton = event.target.closest("[data-wishlist]");
  const categoryButton = event.target.closest("[data-category]");
  const serviceLink = event.target.closest("[data-service]");
  if (cartButton) {
    const product = products.find((item) => item.name === cartButton.dataset.cart);
    if (product) state.cart.push(product);
    saveCustomerState();
    updateCounts();
    renderPanels();
    showToast(`${cartButton.dataset.cart} added to cart`);
  }
  if (wishlistButton) {
    const name = wishlistButton.dataset.wishlist;
    state.wishlist.has(name) ? state.wishlist.delete(name) : state.wishlist.add(name);
    saveCustomerState();
    updateCounts();
    renderProducts();
    renderPanels();
    showToast(state.wishlist.has(name) ? `${name} saved to wishlist` : `${name} removed from wishlist`);
  }
  if (categoryButton) {
    state.activeFilter = categoryButton.dataset.category;
    renderProducts();
    document.querySelector("#featured").scrollIntoView({ behavior: "smooth" });
    showToast(`Showing ${categoryButton.textContent.trim()}`);
  }
  if (serviceLink) openBooking(serviceLink.dataset.service);
  if (event.target.closest("[data-remove-cart]")) {
    state.cart.splice(Number(event.target.closest("[data-remove-cart]").dataset.removeCart), 1);
    saveCustomerState();
    updateCounts();
    renderPanels();
  }
  if (event.target.closest("[data-remove-wishlist]")) {
    state.wishlist.delete(event.target.closest("[data-remove-wishlist]").dataset.removeWishlist);
    saveCustomerState();
    updateCounts();
    renderProducts();
    renderPanels();
  }
});

renderCategories();
renderProducts();
renderServices();
updateCounts();
renderPanels();
