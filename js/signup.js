document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('.signup-box:not(.form-verify) form');

  // --- Inputs signup ---
  const nameInput = signupForm.querySelector('input[type="text"]');
  const phoneInput = signupForm.querySelectorAll('input[type="text"]')[1];
  const emailInput = signupForm.querySelector('#emailInput');
  const password = signupForm.querySelector('#passwordInput1');
  const confirmPassword = signupForm.querySelector('#passwordInput2');

  // Nếu bất kỳ input quan trọng nào bị null, dừng và log để debug
  if (!signupForm || !nameInput || !phoneInput || !emailInput || !password || !confirmPassword) {
    console.error('Một hoặc nhiều input không tìm thấy:', { nameInput, phoneInput, emailInput, password, confirmPassword });
    return;
  }

  // Toggle ẩn/hiện 2 mắt
  const toggle1 = document.querySelector('#togglePassword1');
  if (toggle1) {
    toggle1.addEventListener('click', () => {
      const isHidden = password.type === 'password';
      password.type = isHidden ? 'text' : 'password';
      toggle1.classList.toggle('fa-eye');
      toggle1.classList.toggle('fa-eye-slash');
    });
  }
  const toggle2 = document.querySelector('#togglePassword2');
  if (toggle2) {
    toggle2.addEventListener('click', () => {
      const isHidden = confirmPassword.type === 'password';
      confirmPassword.type = isHidden ? 'text' : 'password';
      toggle2.classList.toggle('fa-eye');
      toggle2.classList.toggle('fa-eye-slash');
    });
  }

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Xóa lỗi cũ
    signupForm.querySelectorAll('.error-message').forEach(el => el.remove());
    //xóa lỗi khi người dùng bấm vào để sửa
    [nameInput, phoneInput, emailInput, password, confirmPassword].forEach(input => {
      input.addEventListener('focus', () => {
        input.classList.remove('input-error');
        input.closest('.input-wrapper, .password-field')?.querySelector('.error-message')?.remove();
      });
    });
    [nameInput, phoneInput, emailInput, password, confirmPassword].forEach(i => i.classList.remove('input-error'));

    let isValid = true;

    const showError = (input, text) => {
      const msg = document.createElement('div');
      msg.className = 'error-message';
      msg.textContent = text;
      // đặt lỗi ngay trên input để không đẩy layout
      input.insertAdjacentElement('beforebegin', msg);
      input.classList.add('input-error');
      isValid = false;
    };

    // Kiểm tra trống
    if (nameInput.value.trim() === '') showError(nameInput, 'Vui lòng nhập họ tên');
    if (phoneInput.value.trim() === '') showError(phoneInput, 'Vui lòng nhập số điện thoại');
    if (emailInput.value.trim() === '') showError(emailInput, 'Vui lòng nhập email');
    if (password.value.trim() === '') showError(password, 'Vui lòng nhập mật khẩu');
    if (confirmPassword.value.trim() === '') showError(confirmPassword, 'Vui lòng xác nhận mật khẩu');

    if (!isValid) return; // dừng nếu có lỗi trống

    // validate phone (10 chữ số) và email
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(phoneInput.value.trim())) {
      showError(phoneInput, 'Số điện thoại không hợp lệ');
    }

    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'Email không hợp lệ');
    }

    if (password.value.length < 8) {
      showError(password, 'Mật khẩu phải có ít nhất 8 ký tự');
    }

    if (password.value !== confirmPassword.value) {
      showError(confirmPassword, 'Mật khẩu xác nhận không khớp');
    }

    // Nếu hợp lệ → hiện popup (KHÔNG submit ngay để user thấy popup)
    if (isValid) {
      const popup = document.querySelector('#successPopup');
      const closeBtn = document.querySelector('#closePopup');
      if (popup) {
        popup.style.display = 'flex';
        // optional: focus close button for accessibility
        if (closeBtn) closeBtn.focus();
        // khi đóng popup chuyển về login
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            window.location.href = 'login.html';
          }, { once: true });
        }
      } else {
        // fallback: nếu không có popup thì submit
        signupForm.submit();
      }
    }
  });
  const fbBtn = document.querySelector(".signup-fb");
  const fbPopup = document.querySelector("#fbSignupPopup");
  const closeFbBtn = document.querySelector("#closeFbPopup");
  const fbLoginBtn = document.querySelector("#fbLoginBtn");
  const allowBtn = document.querySelector("#allowBtn");
  const popupfb = document.querySelector("#popupfb");
  const popupallow = document.querySelector("#popupallow");
  const fbUsername = document.querySelector("#fbUsername");
  const fbPassword = document.querySelector("#fbPassword");
  const toggleFbPassword = document.querySelector("#toggleFbPassword");

  if (!fbPopup) return;

  // Ẩn/hiện mật khẩu
  if (toggleFbPassword && fbPassword) {
    toggleFbPassword.addEventListener("click", () => {
      const isHidden = fbPassword.type === "password";
      fbPassword.type = isHidden ? "text" : "password";
      toggleFbPassword.classList.toggle("fa-eye");
      toggleFbPassword.classList.toggle("fa-eye-slash");
    });
  }

  // Mở popup
  if (fbBtn) {
    fbBtn.addEventListener("click", () => {
      fbPopup.style.display = "flex";
      popupfb.style.display = "flex";
      popupallow.style.display = "none";
    });
  }

  // Đóng popup
  if (closeFbBtn) {
    closeFbBtn.addEventListener("click", () => {
      fbPopup.style.display = "none";
      fbUsername.value = "";
      fbPassword.value = "";
      document.querySelector(".error-message")?.remove();
      fbUsername.classList.remove("input-error");
      fbPassword.classList.remove("input-error");
    });
  }

  // Xóa lỗi khi người dùng click vào ô input
  [fbUsername, fbPassword].forEach(input => {
    input.addEventListener("focus", () => {
      input.classList.remove("input-error");
      input.closest("#popupfb")?.querySelector(".error-message")?.remove();
    });
  });

  // Khi nhấn "Tiếp tục"
  if (fbLoginBtn) {
    fbLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(".error-message")?.remove();
      [fbUsername, fbPassword].forEach(el => el.classList.remove("input-error"));

      let errorMessage = "";

      if (!fbUsername.value.trim() || !fbPassword.value.trim()) {
        errorMessage = "Vui lòng nhập tài khoản và mật khẩu Facebook";
        if (!fbUsername.value.trim()) fbUsername.classList.add("input-error");
        if (!fbPassword.value.trim()) fbPassword.classList.add("input-error");
      }

      if (errorMessage) {
        const msg = document.createElement("div");
        msg.className = "error-message";
        msg.textContent = errorMessage;
        fbPassword.closest(".popup2-password-field").insertAdjacentElement("afterend", msg);
        return;
      }

      // Nếu hợp lệ → chuyển sang form cho phép
      popupfb.classList.add("slide-out");
      setTimeout(() => {
        popupfb.style.display = "none";
        popupfb.classList.remove("slide-out");

        popupallow.style.display = "flex";
        popupallow.classList.add("slide-in");
        setTimeout(() => popupallow.classList.remove("slide-in"), 600);
      }, 500);
    });
  }

  // Khi nhấn "Cho phép"
  if (allowBtn) {
    allowBtn.addEventListener("click", () => {
      fbPopup.style.display = "none"; // ẩn popup FB

      // ẩn form signup bình thường, hiện form verify
      const signupForm = document.querySelector('.signup-box:not(.form-verify)');
      const verifyForm = document.querySelector('.form-verify');

      if (signupForm && verifyForm) {
        signupForm.style.display = 'none';
        verifyForm.style.display = 'block';
      }
    });
  }
  const verifyFormBox = document.querySelector('.form-verify');
  const verifyForm = verifyFormBox.querySelector('form');

  // --- Inputs verify ---
  const verifyName = verifyForm.querySelector('input[type="text"]');
  const verifyPhone = verifyForm.querySelectorAll('input[type="text"]')[1];
  const verifyEmail = verifyForm.querySelector('#emailInput2');

  // --- Xóa lỗi khi người dùng focus (verify form) ---
  [verifyName, verifyPhone, verifyEmail].forEach(input => {
    input.addEventListener('focus', () => {
      input.classList.remove('input-error');
      input.closest('.input-wrapper')?.querySelector('.error-message')?.remove();
    });
  });
  // --- Hàm hiện popup thành công (dùng chung cho signup và verify)
  const showSuccessPopup = () => {
    const popup = document.querySelector('#successPopup');
    const closeBtn = document.querySelector('#closePopup');
    if (popup) {
      popup.style.display = 'flex';
      if (closeBtn) closeBtn.focus();
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          popup.style.display = 'none';
          window.location.href = 'login.html';
        }, { once: true });
      }
    }
  };

  // --- Submit verify form ---
  verifyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Xóa tất cả lỗi cũ
    verifyForm.querySelectorAll('.error-message').forEach(el => el.remove());
    [verifyName, verifyPhone, verifyEmail].forEach(i => i.classList.remove('input-error'));

    let isValid = true;
    const showError = (input, text) => {
      const msg = document.createElement('div');
      msg.className = 'error-message';
      msg.textContent = text;
      input.insertAdjacentElement('beforebegin', msg);
      input.classList.add('input-error');
      isValid = false;
    };

    // Kiểm tra trống
    if (verifyName.value.trim() === '') showError(verifyName, 'Vui lòng nhập họ tên');
    if (verifyPhone.value.trim() === '') showError(verifyPhone, 'Vui lòng nhập số điện thoại');
    if (verifyEmail.value.trim() === '') showError(verifyEmail, 'Vui lòng nhập email');

    // validate phone/email
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (verifyPhone.value.trim() && !phoneRegex.test(verifyPhone.value.trim())) {
      showError(verifyPhone, 'Số điện thoại không hợp lệ');
    }
    if (verifyEmail.value.trim() && !emailRegex.test(verifyEmail.value.trim())) {
      showError(verifyEmail, 'Email không hợp lệ');
    }

    if (isValid) showSuccessPopup();
  });

  // --- Back button ---
  const backBtn = verifyForm.querySelector('.signup-verify-back');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      verifyFormBox.style.display = 'none';
      document.querySelector('.signup-box:not(.form-verify)').style.display = 'block';
    });
  }
});
