document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("#togglePassword");
  const pass = document.querySelector("#passwordInput");

  if (!toggle || !pass) return;

  toggle.addEventListener("click", () => {
    const isHidden = pass.type === "password";
    pass.type = isHidden ? "text" : "password";
    toggle.classList.toggle("fa-eye");
    toggle.classList.toggle("fa-eye-slash");
  });
});

// Xác thực form đăng nhập
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#loginForm');
  const email = document.querySelector('#emailInput');
  const password = document.querySelector('#passwordInput');
  const passwordField = document.querySelector('.password-field');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Xóa lỗi cũ
    const oldError = document.querySelector('.error-message');
    if (oldError) oldError.remove();

    // Reset viền đỏ
    email.classList.remove('input-error');
    password.classList.remove('input-error');

    let errorMessage = '';

    // Kiểm tra trống
    if (email.value.trim() === '' || password.value.trim() === '') {
      errorMessage = 'Vui lòng nhập email và mật khẩu';
      if (email.value.trim() === '') email.classList.add('input-error');
      if (password.value.trim() === '') password.classList.add('input-error');
    }
    // Kiểm tra định dạng sai
    else if (!email.value.includes('@') || password.value.length < 8) {
      errorMessage = 'Email hoặc mật khẩu không đúng';
      email.classList.add('input-error');
      password.classList.add('input-error');
    }

    // Nếu có lỗi → hiện thông báo
    if (errorMessage) {
      const errorMsg = document.createElement('div');
      errorMsg.classList.add('error-message');
      errorMsg.textContent = errorMessage;
      passwordField.insertAdjacentElement('afterend', errorMsg);
    } else {
      form.submit(); // gửi nếu hợp lệ
     // window.location.href = "index.html"; 
      Loader.isLoaded = true;
      window.location.href = "index.html";
    }
  });
});

