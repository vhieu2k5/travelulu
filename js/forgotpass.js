document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#forgotForm');
  const input = document.querySelector('#recoverInput');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Xóa lỗi cũ
    const oldError = document.querySelector('.form-error');
    if (oldError) oldError.remove();
    input.classList.remove('input-error');

    let errorMessage = '';
    const value = input.value.trim();

    // Regex cơ bản để kiểm tra email hoặc số điện thoại
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^(0|\+84)[0-9]{9,10}$/.test(value);

    if (value === '') {
      errorMessage = 'Vui lòng nhập email hoặc số điện thoại';
      input.classList.add('input-error');
    } else if (!isEmail && !isPhone) {
      errorMessage = 'Email hoặc số điện thoại không hợp lệ';
      input.classList.add('input-error');
    }

    if (errorMessage) {
      const errorMsg = document.createElement('div');
      errorMsg.classList.add('form-error');
      errorMsg.textContent = errorMessage;
      input.insertAdjacentElement('afterend', errorMsg);
    } else {
      form.submit();
    }
  });
});
