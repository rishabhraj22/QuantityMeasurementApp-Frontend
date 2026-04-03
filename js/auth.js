function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidMobile(mobile) {
  return /^[0-9]{10}$/.test(mobile);
}

function clearErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach((error) => (error.textContent = ""));
}

function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "🙈";
  } else {
    input.type = "password";
    icon.textContent = "👁";
  }
}

// ----------------------
// SIGNUP
// ----------------------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const mobile = document.getElementById("mobileNumber").value.trim();

    let isValid = true;

    if (fullName === "") {
      document.getElementById("nameError").textContent = "Full name is required";
      isValid = false;
    }

    if (email === "") {
      document.getElementById("signupEmailError").textContent = "Email is required";
      isValid = false;
    } else if (!isValidEmail(email)) {
      document.getElementById("signupEmailError").textContent = "Enter a valid email";
      isValid = false;
    }

    if (password === "") {
      document.getElementById("signupPasswordError").textContent = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      document.getElementById("signupPasswordError").textContent = "Password must be at least 6 characters";
      isValid = false;
    }

    if (mobile === "") {
      document.getElementById("mobileError").textContent = "Mobile number is required";
      isValid = false;
    } else if (!isValidMobile(mobile)) {
      document.getElementById("mobileError").textContent = "Enter a valid 10-digit mobile number";
      isValid = false;
    }

    if (isValid) {
      const user = {
        fullName: fullName,
        email: email,
        password: password,
        mobile: mobile
      };

      localStorage.setItem("registeredUser", JSON.stringify(user));

      alert("Signup successful! Please login.");
      window.location.href = "login.html";
    }
  });
}

// ----------------------
// LOGIN
// ----------------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let isValid = true;

    if (email === "") {
      document.getElementById("loginEmailError").textContent = "Email is required";
      isValid = false;
    }

    if (password === "") {
      document.getElementById("loginPasswordError").textContent = "Password is required";
      isValid = false;
    }

    if (isValid) {
      const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

      if (!storedUser) {
        alert("No account found. Please signup first.");
        window.location.href = "signup.html";
        return;
      }

      if (storedUser.email === email && storedUser.password === password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInUser", storedUser.fullName);

        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password.");
      }
    }
  });
}