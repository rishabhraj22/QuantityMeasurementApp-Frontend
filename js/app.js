import { state } from "./state.js";
import {
  renderTypeSelector,
  renderActionTabs,
  renderInputPanel
} from "./ui.js";

// ================================
// LOGIN PROTECTION
// ================================
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// ================================
// SHOW USER NAME
// ================================
const welcomeUser = document.getElementById("welcomeUser");

if (welcomeUser) {
  const userName = localStorage.getItem("loggedInUser");
  welcomeUser.textContent = userName
    ? "Welcome, " + userName
    : "Welcome, User";
}

// ================================
// LOGOUT
// ================================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");
    window.location.href = "login.html";
  });
}

// ================================
// LOAD UNITS BASED ON TYPE
// ================================
window.loadUnits = function () {
  if (state.type === "Length") {
    state.units = ["km", "m", "cm", "mm"];
  } else if (state.type === "Weight") {
    state.units = ["kg", "g", "mg"];
  } else if (state.type === "Volume") {
    state.units = ["l", "ml"];
  } else if (state.type === "Temperature") {
    state.units = ["C", "F"];
  }

  renderInputPanel();
};

// ================================
// INITIALIZE APP
// ================================
function init() {
  renderTypeSelector();
  renderActionTabs();
  window.loadUnits();
}

init();