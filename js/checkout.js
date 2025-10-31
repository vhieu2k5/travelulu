
document.addEventListener('DOMContentLoaded', () => {

    const datNgay = document.getElementById('dat-ngay');
    const cardRadio = document.getElementById('pay-card');
    const walletRadio = document.getElementById('pay-wallet');
    const overlay = document.getElementById('backdrop-overlay');
    const visaPopup = document.getElementById('visa-popup');
    const paypalPopup = document.getElementById('paypal-popup');


    if (datNgay) {
        datNgay.addEventListener('click', (event) => {
            event.preventDefault();

            let popupElementToShow = null;

            if (cardRadio.checked) {
                popupElementToShow = visaPopup;
            } else if (walletRadio.checked) {
                popupElementToShow = paypalPopup;
            }

            if (popupElementToShow) {
                showPopup(popupElementToShow);
            }
        });


        function showPopup(popupElement) {

            overlay.classList.add('show');
            popupElement.classList.add('show');
            setTimeout(() => {
                window.location.href = "complete-booking.html";
            }, 2000);
        }


    }


    // tb lỗi ô trống


    const paymentButton = document.getElementById('thanhtoan');

    if (paymentButton) {

        const inputsToValidate = document.querySelectorAll('.o-trong');

    // Thêm sự kiện 'focus' (bấm vào) cho từng ô
        inputsToValidate.forEach(function(input) {
            input.addEventListener('focus', function() {
                // 'this' chính là ô input vừa được bấm vào
                
                // 1. Xóa viền đỏ của ô input này
                this.classList.remove('error');
                
                // 2. Ẩn thông báo lỗi tương ứng
                const inputId = this.id; // Lấy id (vd: 'ho_lienhe')
                
                // Chỉ chạy nếu input này có id
                if (inputId) { 
                    const errorId = 'error_' + inputId; // Xây dựng id lỗi (vd: 'error_ho_lienhe')
                    const errorMsg = document.getElementById(errorId);
                    
                    if (errorMsg) {
                        errorMsg.classList.remove('show'); // Ẩn thông báo lỗi đi
                    }
                }
            });
        });



        function showError(inputElement, errorMessageId) {
            inputElement.classList.add('error');
            const errorMsg = document.getElementById(errorMessageId);
            if (errorMsg) {
                errorMsg.classList.add('show');
            }
        }


        paymentButton.addEventListener('click', function (event) {
            event.preventDefault();
            let isValid = true;

            const hoLienHe = document.getElementById('ho_lienhe');
            if (hoLienHe.value.trim() === '') {
                showError(hoLienHe, 'error_ho_lienhe');
                isValid = false;
            }

            const tenLienHe = document.getElementById('ten_lienhe');
            if (tenLienHe.value.trim() === '') {
                showError(tenLienHe, 'error_ten_lienhe');
                isValid = false;
            }

            const emailLienHe = document.getElementById('email_lienhe');
            if (emailLienHe.value.trim() === '') {
                showError(emailLienHe, 'error_email_lienhe');
                isValid = false;
            }

            const sdtLienHe = document.getElementById('sdt_lienhe');
            if (sdtLienHe.value.trim() === '') {
                showError(sdtLienHe, 'error_sdt_lienhe');
                isValid = false;
            }

            const quoctichLienHe = document.getElementById('quoctich_lienhe');
            if (quoctichLienHe.value.trim() === '') {
                showError(quoctichLienHe, 'error_quoctich_lienhe');
                isValid = false;
            }

            const cccdLienHe = document.getElementById('cccd_lienhe');
            if (cccdLienHe.value.trim() === '') {
                showError(cccdLienHe, 'error_cccd_lienhe');
                isValid = false;
            }

            if (isValid) {
                window.location.href = paymentButton.href;
            } else {
                alert('Vui lòng kiểm tra lại các thông tin bắt buộc.');
            }
        });


    }

});

