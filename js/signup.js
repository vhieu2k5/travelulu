document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  // Tìm input theo id nếu có, nếu không thì fallback bằng selector khác
  const nameInput =
    document.querySelector('#nameInput') ||
    form.querySelector('input[type="text"]') ||
    form.querySelector('input[placeholder*="họ tên"]');

  const phoneInput =
    document.querySelector('#phoneInput') ||
    form.querySelector('input[type="number"]') ||
    // fallback: tìm input text thứ 2 (nếu không có loại number)
    (form.querySelectorAll('input[type="text"]')[1] || form.querySelector('input[placeholder*="số"]'));

  const emailInput =
    document.querySelector('#emailInput') ||
    form.querySelector('input[type="email"]') ||
    form.querySelector('input[placeholder*="email"]');

  const password = document.querySelector('#passwordInput1');
  const confirmPassword = document.querySelector('#passwordInput2');

  // Nếu bất kỳ input quan trọng nào bị null, dừng và log để debug
  if (!form || !nameInput || !phoneInput || !emailInput || !password || !confirmPassword) {
    console.error('Một hoặc nhiều input không tìm thấy:', { nameInput, phoneInput, emailInput, password, confirmPassword });
    return;
  }

  // Toggle ẩn/hiện 2 mắt (nếu bạn chưa có phần này chung)
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Xóa lỗi cũ
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    [nameInput, phoneInput, emailInput, password, confirmPassword].forEach(i => i.classList.remove('input-error'));

    let isValid = true;

    const showError = (input, text) => {
      const msg = document.createElement('div');
      msg.className = 'error-message';
      msg.textContent = text;
      // đặt lỗi ngay trên input để không đẩy layout (căn bạn đang dùng)
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
        form.submit();
      }
    }
  });
});
