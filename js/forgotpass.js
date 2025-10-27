document.addEventListener('DOMContentLoaded', () => {
  const forgotForm = document.querySelector('#forgotForm');
  const verifyForm = document.querySelector('#verifyForm');
  const input = document.querySelector('#recoverInput');

  //XÓA LỖI KHI NGƯỜI DÙNG BẤM VÀO Ô NHẬP (FORM 1: NHẬP EMAIL/SĐT)
  if (input) {
    input.addEventListener('focus', () => {
      input.classList.remove('input-error');
      input.closest('form')?.querySelector('.form-error')?.remove();
    });
  }
  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const oldError = document.querySelector('.form-error');
    if (oldError) oldError.remove();
    input.classList.remove('input-error');

    const value = input.value.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^(0|\+84)[0-9]{9,10}$/.test(value);

    if (value === '') {
      showError('Vui lòng nhập email hoặc số điện thoại');
    } else if (!isEmail && !isPhone) {
      showError('Email hoặc số điện thoại không hợp lệ');
    } else {
      // ✅ Chạy hiệu ứng trượt
      forgotForm.classList.add('slide-out');
      setTimeout(() => {
        forgotForm.classList.remove('active', 'slide-out');
        verifyForm.classList.add('active');
      }, 600); // khớp thời gian với CSS transition
    }
  });

  function showError(message) {
    const errorMsg = document.createElement('div');
    errorMsg.classList.add('form-error');
    errorMsg.textContent = message;
    input.insertAdjacentElement('afterend', errorMsg);
    input.classList.add('input-error');
  }
  const backArrow = document.querySelector('#backArrow');

  backArrow.addEventListener('click', (e) => {
    e.preventDefault();
    const forgotForm = document.querySelector('#forgotForm');
    const verifyForm = document.querySelector('#verifyForm');
    const newpassForm = document.querySelector('#newpassForm');

    // 1. Xử lý back: newpassForm -> verifyForm
    if (newpassForm && newpassForm.classList.contains('active')) {
      // newpassForm trượt sang phải (đi ra)
      newpassForm.classList.add('slide-out-right');
      // verifyForm trượt VÀO TỪ TRÁI
      verifyForm.classList.add('from-left'); // Đặt form ở vị trí -100%
      // Sau khi form cũ trượt ra (600ms)
      setTimeout(() => {
        newpassForm.classList.remove('active', 'slide-out-right');
        // 🔥 Bắt buộc trình duyệt tính toán lại vị trí CSS (REFOW)
        void verifyForm.offsetWidth;
        verifyForm.classList.add('active'); // Kích hoạt trượt từ -100% về 0%
        // Dọn dẹp class sau khi hiệu ứng kết thúc (600ms)
        setTimeout(() => {
          verifyForm.classList.remove('from-left');
        }, 600);
      }, 600);
    }

    // 2. Xử lý back: verifyForm -> forgotForm (Tối ưu để thống nhất luồng)
    else if (verifyForm && verifyForm.classList.contains('active')) {
      // form nhập mã trượt sang phải (đi ra)
      verifyForm.classList.add('slide-out-right');
      setTimeout(() => {
        verifyForm.classList.remove('active', 'slide-out-right');

        // form nhập mail trượt vào từ trái
        forgotForm.classList.add('from-left'); // Đặt form ở vị trí -100%
        void forgotForm.offsetWidth; // Buộc Reflow
        forgotForm.classList.add('active'); // Kích hoạt trượt từ -100% về 0%

        // Dọn dẹp class
        setTimeout(() => {
          forgotForm.classList.remove('from-left');
        }, 600);
      }, 600);
    }
    else {
      window.location.href = 'login.html';
    }
  });


  //Xử lý 6 ô nhập mã xác nhận ---
  const codeInputs = document.querySelectorAll('.code-box');
  codeInputs.forEach((input, index) => {
    input.addEventListener('focus', (e) => {
      e.target.select();
      // 🔹 Xóa lỗi khi người dùng sửa
      input.classList.remove('code-error');
      document.querySelector('.code-error-message')?.remove();
      // 🔹 Xóa thông báo thành công (nếu có)
      document.querySelector('.code-success-message')?.remove();
    });

    // Sự kiện input để tự nhảy ô
    input.addEventListener('input', (e) => {
      const value = e.target.value.replace(/[^0-9]/g, ''); // chỉ cho nhập số
      e.target.value = value;
      if (value.length > 1) {
        e.target.value = value.slice(-1);
      }
      if (value && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus(); // tự nhảy sang ô sau
      }
    });

    // Sự kiện keydown để xử lý phím Backspace
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        codeInputs[index - 1].focus(); // backspace quay lại ô trước
      }
    });
  });
  const countdownEl = document.getElementById("countdown");
  const resendLink = document.getElementById("resendLink");
  let timeLeft = 30;

  const timer = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      resendLink.classList.remove("disabled");
      resendLink.textContent = "Yêu cầu mã khác";
    }
  }, 1000);

  resendLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (resendLink.classList.contains("disabled")) return;

    // Giả lập gửi lại mã
    alert("Mã xác nhận mới đã được gửi!");
    // Hiển thị thông báo thành công
    const oldSuccess = document.querySelector('.code-success-message');
    const oldError = document.querySelector('.code-error-message');
    if (oldSuccess) oldSuccess.remove();
    if (oldError) oldError.remove();

    const successMsg = document.createElement('div');
    successMsg.classList.add('code-success-message');
    successMsg.textContent = 'Gửi mã mới thành công. Vui lòng nhập mã xác nhận mới.';
    document.querySelector('.code-inputs').insertAdjacentElement('afterend', successMsg);

    // Xóa viền đỏ nếu có
    document.querySelectorAll('.code-box').forEach(input => input.classList.remove('code-error'));

    // Reset lại countdown
    resendLink.classList.add("disabled");
    timeLeft = 30;
    resendLink.innerHTML = `Yêu cầu mã khác (<span id="countdown">${timeLeft}</span>s)`;
    const newCountdownEl = document.getElementById("countdown");
    const newTimer = setInterval(() => {
      timeLeft--;
      newCountdownEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(newTimer);
        resendLink.classList.remove("disabled");
        resendLink.textContent = "Yêu cầu mã khác";
      }
    }, 1000);
  });
  verifyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const enteredCode = Array.from(codeInputs).map(input => input.value).join('');
    const correctCode = '123456';
    const codeContainer = document.querySelector('.code-inputs');

    // Xóa lỗi cũ nếu có
    const oldError = document.querySelector('.code-error-message');
    if (oldError) oldError.remove();
    codeInputs.forEach(input => {
      input.addEventListener('focus', () => {
        // Xóa đỏ trên tất cả 6 ô
        codeInputs.forEach(i => i.classList.remove('code-error'));
        // Xóa lỗi chữ đỏ
        document.querySelector('.code-error-message')?.remove();
      });
    });

    // Nếu trống
    if (enteredCode.trim() === '') {
      showCodeError('Vui lòng nhập mã xác nhận');
      return;
    }

    // Nếu sai
    if (enteredCode !== correctCode) {
      showCodeError('Mã này không đúng. Vui lòng kiểm tra kĩ rồi thử lại');
      return;
    }
    //nếu đúng
    verifyForm.classList.add('slide-out');

    setTimeout(() => {
      verifyForm.classList.remove('active', 'slide-out');
      const newpassForm = document.querySelector('#newpassForm');
      newpassForm.classList.add('active');
    }, 600);
  });

  function showCodeError(message) {
    // Xóa thông báo thành công cũ nếu có
    const oldSuccess = document.querySelector('.code-success-message');
    if (oldSuccess) oldSuccess.remove();
    const errorMsg = document.createElement('div');
    errorMsg.classList.add('code-error-message');
    errorMsg.textContent = message;

    document.querySelector('.code-inputs').insertAdjacentElement('afterend', errorMsg);
    document.querySelectorAll('.code-box').forEach(input => input.classList.add('code-error'));
  }
  //Ẩn / hiện mật khẩu 
  const password1 = document.querySelector('#passwordInput1');
  const password2 = document.querySelector('#passwordInput2');
  const toggle1 = document.querySelector('#togglePassword1');
  const toggle2 = document.querySelector('#togglePassword2');

  if (toggle1 && password1) {
    toggle1.addEventListener('click', () => {
      const isHidden = password1.type === 'password';
      password1.type = isHidden ? 'text' : 'password';
      toggle1.classList.toggle('fa-eye');
      toggle1.classList.toggle('fa-eye-slash');
    });
  }

  if (toggle2 && password2) {
    toggle2.addEventListener('click', () => {
      const isHidden = password2.type === 'password';
      password2.type = isHidden ? 'text' : 'password';
      toggle2.classList.toggle('fa-eye');
      toggle2.classList.toggle('fa-eye-slash');
    });
  }
  // Xử lý form tạo mật khẩu mới
  const newpassForm = document.querySelector('#newpassForm');
  if (newpassForm) {
    newpassForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const pass1 = document.querySelector('#passwordInput1');
      const pass2 = document.querySelector('#passwordInput2');

      // Xóa lỗi cũ
      newpassForm.querySelectorAll('.error-message').forEach(el => el.remove());
      [pass1, pass2].forEach(i => i.classList.remove('input-error'));

      let isValid = true;

      const showError = (input, text) => {
        // Chỉ tạo lỗi nếu ô đó chưa có lỗi
        if (!input.closest('.password-field')?.querySelector('.error-message')) {
          const msg = document.createElement('div');
          msg.className = 'error-message';
          msg.textContent = text;
          input.insertAdjacentElement('beforebegin', msg);
          input.classList.add('input-error');
        }
        isValid = false;
      };

      // Kiểm tra trống
      if (pass1.value.trim() === '') {
        showError(pass1, 'Vui lòng nhập mật khẩu mới');
      } else if (pass1.value.length < 8) {
        showError(pass1, 'Mật khẩu phải có ít nhất 8 ký tự');
      }

      if (pass2.value.trim() === '') {
        showError(pass2, 'Vui lòng xác nhận mật khẩu');
      } else if (pass1.value !== pass2.value) {
        showError(pass2, 'Mật khẩu xác nhận không khớp');
      }

      // Xóa lỗi khi người dùng bấm lại
      [pass1, pass2].forEach(input => {
        input.addEventListener('focus', () => {
          input.classList.remove('input-error');
          input.closest('.password-field')?.querySelector('.error-message')?.remove();
        });
      });

      if (!isValid) return;

      //Hợp lệ → Hiện popup
      const popup = document.getElementById('successPopup');
      const closePopup = document.getElementById('closePopup');
      popup.style.display = 'flex';
      closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
        window.location.href = 'login.html';
      });
    });
  }
});
