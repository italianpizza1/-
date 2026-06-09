const state = {
  data: window.loadSiteData(),
  activeTab: "",
  cart: []
};

const tabsEl = document.querySelector("#tabs");
const menuGrid = document.querySelector("#menuGrid");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const subtotalEl = document.querySelector("#subtotal");
const discountEl = document.querySelector("#discount");
const totalEl = document.querySelector("#total");
const memberToggle = document.querySelector("#memberToggle");
const memberDealGroup = document.querySelector("#memberDealGroup");
const checkoutForm = document.querySelector("#checkoutForm");
const orderStatus = document.querySelector("#orderStatus");
const orderPayload = document.querySelector("#orderPayload");
const cartDrawer = document.querySelector("#cartDrawer");
const cartBackdrop = document.querySelector("#cartBackdrop");
const membershipBackdrop = document.querySelector("#membershipBackdrop");
const membershipModal = document.querySelector("#membershipModal");
const membershipForm = document.querySelector("#membershipForm");
const membershipStatus = document.querySelector("#membershipStatus");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPrice(value) {
  return `Rs. ${Number(value).toLocaleString("en-PK")}`;
}

function endpointIsConfigured() {
  return state.data.formspreeEndpoint && !state.data.formspreeEndpoint.includes("YOUR_FORM_ID");
}

function allItems() {
  return Object.values(state.data.menu).flat();
}

function findItem(id) {
  return allItems().find((item) => item.id === id);
}

function renderSiteContent() {
  document.querySelector("#heroImage").src = state.data.heroImage;
  document.querySelector("#aboutImage").src = state.data.aboutImage;
  document.querySelector("#aboutTitle").textContent = state.data.about.title;
  document.querySelector("#aboutText").textContent = state.data.about.text;
  document.querySelector("#headerLocation").textContent = state.data.footer.location;
  document.querySelector("#footerLocationSmall").textContent = state.data.footer.location;
  document.querySelector("#footerTagline").textContent = state.data.footer.tagline;
  document.querySelector("#footerAddress").textContent = state.data.footer.address;
  document.querySelector("#footerTimings").textContent = state.data.footer.timings;
  document.querySelector("#mapLink").href = state.data.footer.mapUrl || "#";
  document.querySelector("#facebookLink").href = state.data.footer.facebook || "#";
  document.querySelector("#tiktokLink").href = state.data.footer.tiktok || "#";
  document.querySelector("#instagramLink").href = state.data.footer.instagram || "#";
  document.querySelector("#footerPhones").innerHTML = state.data.footer.phones.map((phone) => (
    `<a href="tel:${escapeHtml(phone.replaceAll(" ", ""))}">${escapeHtml(phone)}</a>`
  )).join("");
}

function renderTabs() {
  state.activeTab = state.data.categories[0]?.id || "";
  tabsEl.innerHTML = state.data.categories.map((category, index) => `
    <button class="tab ${index === 0 ? "active" : ""}" type="button" data-tab="${escapeHtml(category.id)}">${escapeHtml(category.label)}</button>
  `).join("");
}

function renderMenu() {
  const items = state.data.menu[state.activeTab] || [];
  menuGrid.innerHTML = items.map((item) => `
    <article class="menu-card">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy">
      <div class="menu-card-content">
        <header>
          <div>
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.desc)}</p>
          </div>
          <span class="price">${formatPrice(item.price)}</span>
        </header>
        <button type="button" data-add="${escapeHtml(item.id)}">Add to Bag</button>
      </div>
    </article>
  `).join("");
}

function openCartDrawer() {
  cartBackdrop.hidden = false;
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartBackdrop.hidden = true;
  document.body.classList.remove("drawer-open");
}

function openMembershipModal() {
  membershipBackdrop.hidden = false;
  membershipModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeMembershipModal() {
  membershipModal.setAttribute("aria-hidden", "true");
  membershipBackdrop.hidden = true;
  document.body.classList.remove("modal-open");
}

function addToCart(id) {
  const current = state.cart.find((entry) => entry.id === id);
  if (current) current.qty += 1;
  else state.cart.push({ id, qty: 1 });
  renderCart();
}

function updateQty(id, delta) {
  const current = state.cart.find((entry) => entry.id === id);
  if (!current) return;
  current.qty += delta;
  if (current.qty <= 0) state.cart = state.cart.filter((entry) => entry.id !== id);
  renderCart();
}

function getSubtotal() {
  return state.cart.reduce((sum, entry) => {
    const item = findItem(entry.id);
    return item ? sum + Number(item.price) * entry.qty : sum;
  }, 0);
}

function selectedMemberDeal() {
  return document.querySelector('input[name="memberDeal"]:checked')?.value || "";
}

function getBogoDiscount() {
  return state.cart.reduce((sum, entry) => {
    const item = findItem(entry.id);
    return item ? sum + Math.floor(entry.qty / 2) * Number(item.price) : sum;
  }, 0);
}

function getDiscount(subtotal) {
  if (!memberToggle.checked || !selectedMemberDeal()) return 0;
  if (selectedMemberDeal() === "Buy 1 Get 1 Free") return getBogoDiscount();
  return Math.round(subtotal * 0.5);
}

function renderCart() {
  const itemCount = state.cart.reduce((sum, entry) => sum + entry.qty, 0);
  cartCount.textContent = itemCount;

  if (!state.cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your bag is empty.</p>';
  } else {
    cartItems.innerHTML = state.cart.map((entry) => {
      const item = findItem(entry.id);
      if (!item) return "";
      return `
        <div class="cart-row">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <small>${formatPrice(item.price)} each</small>
          </div>
          <div class="qty-controls" aria-label="${escapeHtml(item.name)} quantity">
            <button type="button" data-qty="${escapeHtml(entry.id)}" data-delta="-1">-</button>
            <span>${entry.qty}</span>
            <button type="button" data-qty="${escapeHtml(entry.id)}" data-delta="1">+</button>
          </div>
        </div>
      `;
    }).join("");
  }

  memberDealGroup.disabled = !memberToggle.checked;
  if (!memberToggle.checked) {
    document.querySelectorAll('input[name="memberDeal"]').forEach((input) => {
      input.checked = false;
    });
  }

  const subtotal = getSubtotal();
  const discount = getDiscount(subtotal);
  subtotalEl.textContent = formatPrice(subtotal);
  discountEl.textContent = `-${formatPrice(discount)}`;
  totalEl.textContent = formatPrice(Math.max(0, subtotal - discount));
}

function buildOrderSummary(formData) {
  const subtotal = getSubtotal();
  const discount = getDiscount(subtotal);
  const total = Math.max(0, subtotal - discount);
  const items = state.cart.map((entry) => {
    const item = findItem(entry.id);
    return `${entry.qty} x ${item.name} (${formatPrice(item.price)} each)`;
  });

  return [
    `Customer: ${formData.get("name")}`,
    `Phone: ${formData.get("phone")}`,
    `Address: ${formData.get("address")}`,
    `Notes: ${formData.get("notes") || "None"}`,
    `Member: ${memberToggle.checked ? "Yes" : "No"}`,
    `Member benefit: ${memberToggle.checked ? selectedMemberDeal() : "None"}`,
    memberToggle.checked ? "Delivery note: Customer must show membership card on delivery." : "",
    `Items: ${items.join("; ")}`,
    `Subtotal: ${formatPrice(subtotal)}`,
    `Savings: ${formatPrice(discount)}`,
    `Total: ${formatPrice(total)}`
  ].filter(Boolean).join("\n");
}

async function postToFormspree(formData, statusEl, fallbackMessage) {
  if (!endpointIsConfigured()) {
    statusEl.textContent = fallbackMessage;
    return false;
  }

  const response = await fetch(state.data.formspreeEndpoint, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" }
  });
  return response.ok;
}

async function submitOrder(event) {
  event.preventDefault();
  if (!state.cart.length) {
    orderStatus.textContent = "Please add at least one item before checkout.";
    return;
  }
  if (memberToggle.checked && !selectedMemberDeal()) {
    orderStatus.textContent = "Please choose 50% off or Buy 1 Get 1 Free for your member order.";
    return;
  }

  const formData = new FormData(checkoutForm);
  const summary = buildOrderSummary(formData);
  orderPayload.value = summary;
  formData.set("order_summary", summary);
  orderStatus.textContent = "Sending your order...";

  const sent = await postToFormspree(formData, orderStatus, "Order prepared. Add your Formspree endpoint in Admin to receive live orders.");
  if (!sent && endpointIsConfigured()) {
    orderStatus.textContent = "Order could not be sent. Please call the restaurant to confirm.";
    return;
  }
  if (sent) orderStatus.textContent = "Order sent. The restaurant will confirm shortly.";
  checkoutForm.reset();
  state.cart = [];
  memberToggle.checked = false;
  renderCart();
}

async function submitMembership(event) {
  event.preventDefault();
  const formData = new FormData(membershipForm);
  formData.set("order_summary", "Membership card home delivery request. Amount: Rs. 1000.");
  membershipStatus.textContent = "Sending membership request...";
  const sent = await postToFormspree(formData, membershipStatus, "Membership request prepared. Add your Formspree endpoint in Admin to receive it.");
  if (!sent && endpointIsConfigured()) {
    membershipStatus.textContent = "Request could not be sent. Please call the restaurant.";
    return;
  }
  if (sent) membershipStatus.textContent = "Membership request sent. The restaurant will confirm shortly.";
  membershipForm.reset();
}

tabsEl.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-tab]");
  if (!tab) return;
  state.activeTab = tab.dataset.tab;
  tabsEl.querySelectorAll(".tab").forEach((item) => item.classList.toggle("active", item === tab));
  renderMenu();
});

menuGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  addToCart(button.dataset.add);
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-qty]");
  if (!button) return;
  updateQty(button.dataset.qty, Number(button.dataset.delta));
});

document.querySelector("#openCart").addEventListener("click", openCartDrawer);
document.querySelector("#closeCart").addEventListener("click", closeCartDrawer);
cartBackdrop.addEventListener("click", closeCartDrawer);
memberToggle.addEventListener("change", renderCart);
document.querySelectorAll('input[name="memberDeal"]').forEach((input) => input.addEventListener("change", renderCart));
checkoutForm.addEventListener("submit", submitOrder);

document.querySelector("#openMembership").addEventListener("click", openMembershipModal);
document.querySelector("#openMembershipTwo").addEventListener("click", openMembershipModal);
document.querySelector("#closeMembership").addEventListener("click", closeMembershipModal);
membershipBackdrop.addEventListener("click", closeMembershipModal);
document.querySelector("#membershipRestaurant").addEventListener("click", () => {
  membershipStatus.textContent = "You can collect your lifetime membership card from the restaurant for Rs. 1000.";
});
document.querySelector("#membershipHome").addEventListener("click", () => {
  membershipForm.hidden = false;
  membershipStatus.textContent = "";
});
membershipForm.addEventListener("submit", submitMembership);

renderSiteContent();
renderTabs();
renderMenu();
renderCart();
