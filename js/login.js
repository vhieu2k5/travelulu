document.addEventListener("DOMContentLoaded", () => {
  // 👁️ Toggle ẩn/hiện mật khẩu
  const toggle = document.querySelector("#togglePassword");
  const pass = document.querySelector("#passwordInput");
  const form = document.querySelector("#loginForm");
  const email = document.querySelector("#emailInput");
  const passwordField = document.querySelector(".password-field");

  if (toggle && pass) {
    toggle.addEventListener("click", () => {
      const isHidden = pass.type === "password";
      pass.type = isHidden ? "text" : "password";
      toggle.classList.toggle("fa-eye");
      toggle.classList.toggle("fa-eye-slash");
    });
  }

  // Khi người dùng click vào ô nhập, xóa lỗi cũ (login chính)
  [email, pass].forEach(input => {
    input.addEventListener("focus", () => {
      input.classList.remove("input-error");
      document.querySelectorAll(".error-message").forEach(el => el.remove());
    });
  });

  // 🧩 Xác thực form đăng nhập chính
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelectorAll(".error-message").forEach(el => el.remove());
    [email, pass].forEach(el => el.classList.remove("input-error"));

    let errorMessage = "";

    if (!email.value.trim() || !pass.value.trim()) {
      errorMessage = "Vui lòng nhập email và mật khẩu";
      if (!email.value.trim()) email.classList.add("input-error");
      if (!pass.value.trim()) pass.classList.add("input-error");
    } else if (!email.value.includes("@") || pass.value.length < 8) {
      errorMessage = "Email hoặc mật khẩu không đúng";
      email.classList.add("input-error");
      pass.classList.add("input-error");
    }

    if (errorMessage) {
      const msg = document.createElement("div");
      msg.className = "error-message";
      msg.textContent = errorMessage;
      passwordField.insertAdjacentElement("afterend", msg);
      return;
    }

    form.submit();
    window.location.href = "index.html";
  });

  // Hiển thị popup Facebook
  const fbBtn = document.querySelector(".login-fb");
  const fbPopup = document.querySelector("#fbLoginPopup");
  const closeFbBtn = document.querySelector("#closeFbPopup");
  const fbLoginBtn = document.querySelector("#fbLoginBtn");

  if (fbBtn && fbPopup) {
    fbBtn.addEventListener("click", () => {
      fbPopup.style.display = "flex";
    });
  }

  if (closeFbBtn) {
    closeFbBtn.addEventListener("click", () => {
      fbPopup.style.display = "none";
      fbPopup.querySelectorAll(".error-message").forEach(e => e.remove());
      fbPopup.querySelectorAll(".input-error").forEach(e => e.classList.remove("input-error"));
    });
  }
  const toggleFb = document.querySelector("#toggleFbPassword");
  const fbPass = document.querySelector("#fbPassword");

  if (toggleFb && fbPass) {
    toggleFb.addEventListener("click", () => {
      const isHidden = fbPass.type === "password";
      fbPass.type = isHidden ? "text" : "password";
      toggleFb.classList.toggle("fa-eye");
      toggleFb.classList.toggle("fa-eye-slash");
    });
  }
  // 🧠 Xử lý đăng nhập Facebook (hiệu ứng trượt)
  const fbForm = document.querySelector("#popupfb");
  const fbAllow = document.querySelector("#popupallow");
  const fbUsername = document.querySelector("#fbUsername");
  const fbPassword = document.querySelector("#fbPassword");
  const fbLoginBtnPopup = document.querySelector("#fbLoginBtn");

  // Xóa lỗi khi focus lại input
  [fbUsername, fbPassword].forEach(input => {
    input.addEventListener("focus", () => {
      input.classList.remove("input-error");
      fbPopup.querySelectorAll(".error-message").forEach(el => el.remove());
    });
  });

  if (fbLoginBtnPopup) {
    fbLoginBtnPopup.addEventListener("click", (e) => {
      e.preventDefault();

      // Xóa lỗi cũ
      fbPopup.querySelectorAll(".error-message").forEach(el => el.remove());
      [fbUsername, fbPassword].forEach(el => el.classList.remove("input-error"));

      // Kiểm tra hợp lệ
      if (!fbUsername.value.trim() || !fbPassword.value.trim()) {
        const msg = document.createElement("div");
        msg.className = "error-message";
        msg.textContent = "Vui lòng nhập tài khoản và mật khẩu Facebook";
        fbPassword.closest(".popup-password-field").insertAdjacentElement("afterend", msg);

        if (!fbUsername.value.trim()) fbUsername.classList.add("input-error");
        if (!fbPassword.value.trim()) fbPassword.classList.add("input-error");
        return;
      }

      // ✅ Nếu hợp lệ → trượt sang form Cho phép
      fbForm.classList.add("slide-out");

      setTimeout(() => {
        fbForm.style.display = "none";
        fbAllow.style.display = "flex";
        fbAllow.classList.add("slide-in");
        fbForm.classList.remove("slide-out");
      }, 600);
    });
  }
  const allowBtn = document.querySelector("#allowBtn");

  if (allowBtn) {
    allowBtn.addEventListener("click", () => {
      fbAllow.classList.add("slide-out");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 400);
    });
  }
});
