const adminState = {
  data: window.loadSiteData(),
  currentCategory: "",
  currentItemId: ""
};

const loginCard = document.querySelector("#loginCard");
const dashboard = document.querySelector("#adminDashboard");
const adminLogin = document.querySelector("#adminLogin");
const adminPassword = document.querySelector("#adminPassword");
const categorySelect = document.querySelector("#categorySelect");
const itemCategory = document.querySelector("#itemCategory");
const itemList = document.querySelector("#adminItemList");
const itemForm = document.querySelector("#itemForm");
const adminStatus = document.querySelector("#adminStatus");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `item-${Date.now()}`;
}

function saveData(message = "Saved.") {
  window.saveSiteData(adminState.data);
  adminStatus.textContent = message;
}

function fillSettings() {
  document.querySelector("#formspreeEndpoint").value = adminState.data.formspreeEndpoint;
  document.querySelector("#heroImageInput").value = adminState.data.heroImage;
  document.querySelector("#aboutImageInput").value = adminState.data.aboutImage;
  document.querySelector("#aboutTitleInput").value = adminState.data.about.title;
  document.querySelector("#aboutTextInput").value = adminState.data.about.text;
  document.querySelector("#taglineInput").value = adminState.data.footer.tagline;
  document.querySelector("#locationInput").value = adminState.data.footer.location;
  document.querySelector("#addressInput").value = adminState.data.footer.address;
  document.querySelector("#mapInput").value = adminState.data.footer.mapUrl;
  document.querySelector("#phonesInput").value = adminState.data.footer.phones.join("\n");
  document.querySelector("#timingsInput").value = adminState.data.footer.timings;
  document.querySelector("#facebookInput").value = adminState.data.footer.facebook;
  document.querySelector("#tiktokInput").value = adminState.data.footer.tiktok;
  document.querySelector("#instagramInput").value = adminState.data.footer.instagram;
}

function readSettings() {
  adminState.data.formspreeEndpoint = document.querySelector("#formspreeEndpoint").value.trim();
  adminState.data.heroImage = document.querySelector("#heroImageInput").value.trim();
  adminState.data.aboutImage = document.querySelector("#aboutImageInput").value.trim();
  adminState.data.about.title = document.querySelector("#aboutTitleInput").value.trim();
  adminState.data.about.text = document.querySelector("#aboutTextInput").value.trim();
  adminState.data.footer.tagline = document.querySelector("#taglineInput").value.trim();
  adminState.data.footer.location = document.querySelector("#locationInput").value.trim();
  adminState.data.footer.address = document.querySelector("#addressInput").value.trim();
  adminState.data.footer.mapUrl = document.querySelector("#mapInput").value.trim();
  adminState.data.footer.phones = document.querySelector("#phonesInput").value.split("\n").map((phone) => phone.trim()).filter(Boolean);
  adminState.data.footer.timings = document.querySelector("#timingsInput").value.trim();
  adminState.data.footer.facebook = document.querySelector("#facebookInput").value.trim();
  adminState.data.footer.tiktok = document.querySelector("#tiktokInput").value.trim();
  adminState.data.footer.instagram = document.querySelector("#instagramInput").value.trim();
}

function renderCategoryControls() {
  const options = adminState.data.categories.map((category) => (
    `<option value="${escapeHtml(category.id)}">${escapeHtml(category.label)}</option>`
  )).join("");
  categorySelect.innerHTML = options;
  itemCategory.innerHTML = options;
  if (!adminState.currentCategory) adminState.currentCategory = adminState.data.categories[0]?.id || "";
  categorySelect.value = adminState.currentCategory;
}

function renderItemList() {
  const items = adminState.data.menu[adminState.currentCategory] || [];
  itemList.innerHTML = items.map((item) => `
    <button class="admin-item ${item.id === adminState.currentItemId ? "active" : ""}" type="button" data-id="${escapeHtml(item.id)}">
      <img src="${escapeHtml(item.image)}" alt="">
      <span>
        <strong>${escapeHtml(item.name)}</strong>
        <small>Rs. ${Number(item.price).toLocaleString("en-PK")}</small>
      </span>
    </button>
  `).join("");
}

function clearItemForm() {
  adminState.currentItemId = "";
  document.querySelector("#itemId").value = "";
  itemCategory.value = adminState.currentCategory;
  document.querySelector("#itemName").value = "";
  document.querySelector("#itemPrice").value = "";
  document.querySelector("#itemImage").value = "";
  document.querySelector("#itemDesc").value = "";
  renderItemList();
}

function fillItemForm(item) {
  adminState.currentItemId = item.id;
  document.querySelector("#itemId").value = item.id;
  itemCategory.value = adminState.currentCategory;
  document.querySelector("#itemName").value = item.name;
  document.querySelector("#itemPrice").value = item.price;
  document.querySelector("#itemImage").value = item.image;
  document.querySelector("#itemDesc").value = item.desc;
  renderItemList();
}

function bootDashboard() {
  loginCard.hidden = true;
  dashboard.hidden = false;
  fillSettings();
  renderCategoryControls();
  renderItemList();
  clearItemForm();
}

adminLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  if (adminPassword.value !== adminState.data.password) {
    adminPassword.setCustomValidity("Wrong password");
    adminPassword.reportValidity();
    adminPassword.setCustomValidity("");
    return;
  }
  sessionStorage.setItem("italianPizzaAdminLoggedIn", "true");
  bootDashboard();
});

categorySelect.addEventListener("change", () => {
  adminState.currentCategory = categorySelect.value;
  clearItemForm();
  renderItemList();
});

itemList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-id]");
  if (!button) return;
  const item = (adminState.data.menu[adminState.currentCategory] || []).find((entry) => entry.id === button.dataset.id);
  if (item) fillItemForm(item);
});

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const targetCategory = itemCategory.value;
  const idInput = document.querySelector("#itemId").value;
  const item = {
    id: idInput || slugify(document.querySelector("#itemName").value),
    name: document.querySelector("#itemName").value.trim(),
    price: Number(document.querySelector("#itemPrice").value),
    image: document.querySelector("#itemImage").value.trim(),
    desc: document.querySelector("#itemDesc").value.trim()
  };

  Object.keys(adminState.data.menu).forEach((categoryId) => {
    adminState.data.menu[categoryId] = adminState.data.menu[categoryId].filter((entry) => entry.id !== item.id);
  });
  adminState.data.menu[targetCategory].push(item);
  adminState.currentCategory = targetCategory;
  adminState.currentItemId = item.id;
  readSettings();
  saveData("Item saved. Open the website to see the update.");
  renderCategoryControls();
  renderItemList();
});

document.querySelector("#newItem").addEventListener("click", clearItemForm);

document.querySelector("#deleteItem").addEventListener("click", () => {
  const id = document.querySelector("#itemId").value;
  if (!id) return;
  adminState.data.menu[adminState.currentCategory] = adminState.data.menu[adminState.currentCategory].filter((item) => item.id !== id);
  clearItemForm();
  saveData("Item deleted.");
});

document.querySelector("#saveAll").addEventListener("click", () => {
  readSettings();
  saveData("All website settings saved.");
});

document.querySelector("#resetData").addEventListener("click", () => {
  adminState.data = structuredClone(window.DEFAULT_SITE_DATA);
  window.saveSiteData(adminState.data);
  adminState.currentCategory = adminState.data.categories[0].id;
  adminState.currentItemId = "";
  fillSettings();
  renderCategoryControls();
  renderItemList();
  clearItemForm();
  adminStatus.textContent = "Demo data restored.";
});

if (sessionStorage.getItem("italianPizzaAdminLoggedIn") === "true") {
  bootDashboard();
}
