# Quantity Measurement App - React Frontend

A modern **React + Vite frontend** for the **Quantity Measurement App (QMA)**.  
This frontend provides a clean and interactive user interface for performing:

- Unit **Conversion**
- Unit **Comparison**
- Unit **Arithmetic**
- Guest access without login
- User-specific history after login

---

## 🚀 Features

### ✅ Core Measurement Features
- **Length**
- **Weight**
- **Temperature**
- **Volume**

### ✅ Supported Actions
- **Conversion**
- **Comparison**
- **Arithmetic Operations**

### ✅ Authentication Features
- **Signup**
- **Login**
- **Logout**
- **Guest Mode**

### ✅ Smart User Experience
- Users can use the app **without login**
- **History is only visible for logged-in users**
- **History is only saved when logged in**
- Each logged-in user gets **their own separate history**
- Logged-in users can **clear their own history**
- Personalized welcome banner for logged-in users

---

## 🛠️ Tech Stack

- **React**
- **Vite**
- **React Router DOM**
- **Context API**
- **CSS**
- **LocalStorage**

---

## 📂 Project Structure

```bash
frontend-react/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   ├── converter/
│   │   └── history/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
