const products = [
  {
    id: 1, name: "Pistachio Cloud", category: "dessert", price: 42000,
    image: "assets/pistachio-layer.jpg",
    description: "Pistachio cream, soft cake & crunchy nut layer."
  },
  {
    id: 2, name: "Chocolate Pistachio", category: "cake", price: 48000,
    image: "assets/chocolate-pistachio.jpg",
    description: "Dark chocolate cake with pistachio filling."
  },
  {
    id: 3, name: "Kunafa Pistachio", category: "dessert", price: 45000,
    image: "assets/kunafa-pistachio.jpg",
    description: "Creamy pistachio with golden kunafa crunch."
  },
  {
    id: 4, name: "Pistachio Knafeh", category: "dessert", price: 46000,
    image: "assets/pistachio-knafeh.jpg",
    description: "A rich layered creation with roasted pistachio."
  },
  {
    id: 5, name: "Pistachio Cream", category: "food", price: 38000,
    image: "assets/pistachio-cream.jpg",
    description: "Silky pistachio cream with toasted nuts."
  },
  {
    id: 6, name: "Choco Pistachio Slice", category: "cake", price: 44000,
    image: "assets/pistachio-chocolate-texture.jpg",
    description: "Chocolate layers with a generous pistachio center."
  },
  {
    id: 7, name: "Pistachio Crunch", category: "food", price: 40000,
    image: "assets/pistachio-chocolate-close.jpg",
    description: "A textural bite of chocolate, pistachio & crunch."
  },
  {
    id: 8, name: "Pistachio Cookie", category: "dessert", price: 29000,
    image: "assets/pistachio-cookie.jpg",
    description: "Soft chocolate cookie with pistachio filling."
  },
  {
    id: 9, name: "Rose Lychee Sparkle", category: "drink", price: 28000,
    image: "assets/pistachio-cream.jpg",
    description: "Refreshing rose, lychee & sparkling soda."
  },
];

const rupiah = n => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0
}).format(n);

const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");

let cart = JSON.parse(localStorage.getItem("simplyModernCart") || "[]");

function categoryLabel(category) {
  return {
    dessert: "Dessert", cake: "Cake", food: "Food", drink: "Sparkling"
  }[category] || category;
}

function renderProducts(filter = "all") {
  productGrid.innerHTML = products
    .filter(p => filter === "all" || p.category === filter)
    .map(p => `
      <article class="product-card reveal visible">
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <span class="product-badge">${categoryLabel(p.category)}</span>
          <button class="quick-add" data-add="${p.id}" aria-label="Tambah ${p.name}">+</button>
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <div class="product-price">${rupiah(p.price)}</div>
        </div>
      </article>
    `).join("");
}

function saveCart() {
  localStorage.setItem("simplyModernCart", JSON.stringify(cart));
}

function addToCart(id) {
  const item = cart.find(x => x.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
  renderCart();
  showToast("Added to your bag ✦");
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, x) => sum + x.qty, 0);
  cartCount.textContent = count;

  if (!cart.length) {
    cartItems.innerHTML = `<div class="cart-empty">Your bag is waiting for<br><em>something sweet.</em></div>`;
    cartTotal.textContent = rupiah(0);
    return;
  }

  let total = 0;
  cartItems.innerHTML = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    const line = p.price * item.qty;
    total += line;
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <h4>${p.name}</h4>
          <small>${rupiah(p.price)}</small>
          <div class="qty">
            <button data-minus="${p.id}">−</button>
            <span>${item.qty}</span>
            <button data-plus="${p.id}">+</button>
          </div>
        </div>
        <strong>${rupiah(line)}</strong>
      </div>
    `;
  }).join("");
  cartTotal.textContent = rupiah(total);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

// Product filtering
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

// Event delegation for product/cart buttons
document.addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if (add) addToCart(Number(add.dataset.add));

  const plus = e.target.closest("[data-plus]");
  if (plus) changeQty(Number(plus.dataset.plus), 1);

  const minus = e.target.closest("[data-minus]");
  if (minus) changeQty(Number(minus.dataset.minus), -1);
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Sticky header
const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Cart drawer
const cartDrawer = document.getElementById("cartDrawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
function openCart() {
  cartDrawer.classList.add("open");
  drawerBackdrop.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
}
function closeCart() {
  cartDrawer.classList.remove("open");
  drawerBackdrop.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
}
document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
drawerBackdrop.addEventListener("click", closeCart);

// Search overlay
const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

function openSearch() {
  searchOverlay.classList.add("open");
  searchOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  setTimeout(() => searchInput.focus(), 100);
}
function closeSearch() {
  searchOverlay.classList.remove("open");
  searchOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
}
document.getElementById("searchBtn").addEventListener("click", openSearch);
document.getElementById("closeSearch").addEventListener("click", closeSearch);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeSearch(); closeCart(); }
});

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  const results = q
    ? products.filter(p => `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q))
    : products.slice(0, 5);

  searchResults.innerHTML = results.length
    ? results.map(p => `<div class="search-result"><span>${categoryLabel(p.category)}</span><strong>${p.name}</strong><span>${rupiah(p.price)}</span></div>`).join("")
    : `<p style="color:rgba(255,255,255,.6);font-size:12px">Tidak ada produk yang cocok.</p>`;
});

// Newsletter
document.getElementById("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  e.target.reset();
  showToast("Thank you — you're on the list ✦");
});

// Initial render
renderProducts();
renderCart();
