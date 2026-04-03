import { state } from "./state.js";
import { convertUnits } from "./conversion.js";

export function renderTypeSelector() {
  const container = document.getElementById("type-selector");

  const types = [
    { name: "Length", icon: "📏" },
    { name: "Weight", icon: "⚖️" },
    { name: "Temperature", icon: "🌡️" },
    { name: "Volume", icon: "🧴" }
  ];

  container.innerHTML = types
    .map(
      (item) => `
      <button class="card-btn ${state.type === item.name ? "active" : ""}" onclick="selectType('${item.name}')">
        <div class="type-icon">${item.icon}</div>
        <div>${item.name}</div>
      </button>
    `
    )
    .join("");
}

export function renderActionTabs() {
  const container = document.getElementById("action-tabs");
  const actions = ["Comparison", "Conversion", "Arithmetic"];

  container.innerHTML = actions
    .map(
      (action) => `
      <button class="tab-btn ${state.action === action ? "active" : ""}" onclick="selectAction('${action}')">
        ${action}
      </button>
    `
    )
    .join("");
}

export function renderInputPanel() {
  const container = document.getElementById("input-panel");

  const options = state.units
    .map((unit) => `<option value="${unit}">${unit}</option>`)
    .join("");

  if (state.action === "Arithmetic") {
    container.innerHTML = `
      <div class="input-grid arithmetic-layout">
        <div class="input-box">
          <label>VALUE 1</label>
          <input type="number" id="value1" placeholder="Enter value 1" />
          <select id="fromUnit">${options}</select>
        </div>

        <div class="operator-box">
          <select id="operator">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="/">/</option>
          </select>
        </div>

        <div class="input-box">
          <label>VALUE 2</label>
          <input type="number" id="value2" placeholder="Enter value 2" />
          <select id="toUnit">${options}</select>
        </div>
      </div>

      <button class="calculate-btn" onclick="handleCalculate()">Calculate</button>

      <div class="result-box">
        <label>RESULT</label>
        <div class="result-value" id="result">—</div>
      </div>
    `;
  } else {
    const secondLabel =
      state.action === "Comparison" ? "COMPARE WITH" : "TO";

    container.innerHTML = `
      <div class="input-grid">
        <div class="input-box">
          <label>FROM</label>
          <input type="number" id="value1" placeholder="Enter value" />
          <select id="fromUnit">${options}</select>
        </div>

        <div class="input-box">
          <label>${secondLabel}</label>
          <input type="number" id="value2" placeholder="Enter value" />
          <select id="toUnit">${options}</select>
        </div>
      </div>

      <button class="calculate-btn" onclick="handleCalculate()">Calculate</button>

      <div class="result-box">
        <label>RESULT</label>
        <div class="result-value" id="result">—</div>
      </div>
    `;
  }
}

window.selectType = function (type) {
  state.type = type;
  renderTypeSelector();
  window.loadUnits();
};

window.selectAction = function (action) {
  state.action = action;
  renderActionTabs();
  renderInputPanel();
};

window.handleCalculate = function () {
  const value1 = parseFloat(document.getElementById("value1")?.value || 0);
  const value2 = parseFloat(document.getElementById("value2")?.value || 0);
  const fromUnit = document.getElementById("fromUnit")?.value;
  const toUnit = document.getElementById("toUnit")?.value;
  const operator = document.getElementById("operator")?.value || "+";

  let result = "";

  if (state.action === "Conversion") {
    const res = convertUnits(value1, fromUnit, toUnit, state.type);
    result = `${Number(res.toFixed(3))} ${toUnit}`;
  }

  else if (state.action === "Comparison") {
    const res = convertUnits(value1, fromUnit, toUnit, state.type);

    if (res > value2) result = "Greater";
    else if (res < value2) result = "Less";
    else result = "Equal";
  }

  else if (state.action === "Arithmetic") {
    const convertedValue2 = convertUnits(value2, toUnit, fromUnit, state.type);

    if (operator === "+") result = value1 + convertedValue2;
    else if (operator === "-") result = value1 - convertedValue2;
    else if (operator === "/") result = value1 / convertedValue2;

    result = `${Number(result.toFixed(3))} ${fromUnit}`;
  }

  document.getElementById("result").innerText = result;
};