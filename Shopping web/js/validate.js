// validate.js
export function isEmailValid(email) {
  const regex = /^[\w.-]+@[\w.-]+\.\w+$/;
  return regex.test(email);
}

export function isPasswordStrong(password) {
  return password.length >= 6 && /[A-Z]/.test(password) && /\d/.test(password);
}

export function setError(input, errorEl, message) {
  input.classList.add("input-error");
  errorEl.textContent = message;
}

export function clearError(input, errorEl) {
  input.classList.remove("input-error");
  errorEl.textContent = "";
}

// Toggle password visibility
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("toggle-password")) {
    const target = document.querySelector(e.target.getAttribute("toggle"));
    if (target) {
      target.type = target.type === "password" ? "text" : "password";
    }
  }
});

const confirmPasswordInput = document.getElementById("confirm-password");
const confirmError = document.getElementById("confirm-error");

confirmPasswordInput.addEventListener("input", () => {
  if (confirmPasswordInput.value !== passwordInput.value) {
    setError(confirmPasswordInput, confirmError, "Mật khẩu xác nhận không khớp.");
  } else {
    clearError(confirmPasswordInput, confirmError);
  }
});

const registerForm = document.getElementById("register-form");

if (registerForm) {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirm-password");

  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const confirmError = document.getElementById("confirm-error");
  const errorBox = document.getElementById("form-errors");

  function clearAllErrors() {
    errorBox.classList.add("hidden");
    errorBox.innerHTML = "";
    [emailError, passwordError, confirmError].forEach(el => el.textContent = "");
  }

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearAllErrors();
    let errors = [];

    if (!emailInput.value.trim()) {
      emailError.textContent = "Email can't be blank.";
      errors.push("Email can't be blank.");
    } else if (!isEmailValid(emailInput.value)) {
      emailError.textContent = "Email không hợp lệ.";
      errors.push("Invalid email format.");
    }

    if (!passwordInput.value.trim()) {
      passwordError.textContent = "Password can't be blank.";
      errors.push("Password can't be blank.");
    } else if (!isPasswordStrong(passwordInput.value)) {
      passwordError.textContent = "Password must be ≥6 characters, with 1 uppercase & number.";
      errors.push("Password too weak (≥6 chars, 1 uppercase, 1 number).");
    }

    if (confirmInput.value !== passwordInput.value) {
      confirmError.textContent = "Passwords do not match.";
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      errorBox.classList.remove("hidden");
      errorBox.innerHTML = `
        <strong>❗ Please adjust the following:</strong>
        <ul>${errors.map(err => `<li>${err}</li>`).join("")}</ul>
      `;
    } else {
      alert("✅ Đăng ký thành công!");
      registerForm.reset();
      clearAllErrors();
    }
  });
}
