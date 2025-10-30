
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

    const huyTour = document.getElementById('buttonhuy');
    const hoiLai = document.getElementById('hoi-lai');
    const lydo = document.getElementById('ly-do');
    const loading = document.getElementById('loading');
    const hoantat = document.getElementById('hoan-tat');
    const quayLai = document.getElementById('quay-lai');
    const buttonHuy = document.getElementById('huy')
    const tieptuc = document.getElementById('tiep-tuc')

    huyTour.addEventListener('click', (event) => {
        event.preventDefault(); 
        overlay.classList.add('show');
        hoiLai.classList.add('show');
    });

    quayLai.addEventListener('click', (event) => {
        event.preventDefault(); 
        overlay.classList.remove('show');
        hoiLai.classList.remove('show');
        lydo.classList.remove('show');
    });

    buttonHuy.addEventListener('click', (event) => {
        event.preventDefault(); 
        hoiLai.classList.remove('show');
        lydo.classList.add('show');
    });

    tieptuc.addEventListener('click', (event) => {
        event.preventDefault(); 
        lydo.classList.remove('show');
        loading.classList.add('show');
        setTimeout(() => {
            loading.classList.remove('show');
            hoantat.classList.add('show');;
        }, 2000);
    });

});