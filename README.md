# 📏 Quantity Measurement App (Frontend)

A modern **frontend-based Quantity Measurement Application** built using **HTML, CSS, and JavaScript (ES6 Modules)**.

This application allows users to perform:

- Unit **Conversion**
- Value **Comparison**
- Quantity **Arithmetic operations**

It also includes a **Login & Signup system (frontend simulation)** using LocalStorage.

---

## 🚀 Features

### 🔐 Authentication (Frontend Simulation)
- User Signup page
- User Login page
- LocalStorage-based authentication
- Welcome message after login
- Logout functionality

---

### 📐 Measurement Categories
- Length
- Weight
- Temperature
- Volume

---

### 🧮 Operations Supported

#### 1. Comparison
Compare two values after converting them to the same unit.

**Example:**
- `1 km` vs `1000 m` → Equal  
- `2 kg` vs `1500 g` → Greater  

---

#### 2. Conversion
Convert value from one unit to another.

**Example:**
- `1 km → 1000 m`  
- `32 F → 0 C`  

---

#### 3. Arithmetic
Perform operations between quantities.

**Supported operators:**
- Addition (`+`)
- Subtraction (`-`)
- Division (`/`)

**Example:**
- `1 km + 1 m = 1.001 km`

---

## 🎨 UI Highlights

- Dashboard-style modern UI
- Blue gradient header
- Card-based type selection
- Action tabs (Comparison / Conversion / Arithmetic)
- Clean and responsive layout
- Dynamic UI rendering

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6 Modules)

### Storage
- LocalStorage (for authentication simulation)

---

## 📂 Project Structure

```bash
QuantityMeasurementApp-Frontend/
│
├── assets/
│   └── auth.png
│
├── css/
│   ├── styles.css
│   ├── components.css
│   └── auth.css
│
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── conversion.js
│   ├── state.js
│   └── ui.js
│
├── index.html
├── login.html
├── signup.html
└── README.md
