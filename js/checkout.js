
document.addEventListener('DOMContentLoaded', () => {

    const datNgay = document.getElementById('dat-ngay');
    const cardRadio = document.getElementById('pay-card');
    const walletRadio = document.getElementById('pay-wallet');
    const overlay = document.getElementById('backdrop-overlay');
    const visaPopup = document.getElementById('visa-popup');
    const paypalPopup = document.getElementById('paypal-popup');
    
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
});

