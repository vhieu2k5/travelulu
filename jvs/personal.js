const alltheSections = document.querySelectorAll(".container");
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");
const section5 = document.querySelector(".section-5");
const section6 = document.querySelector(".section-6");


const profileBtn = document.getElementById("profileBtn");
const iconProfileBtn = document.querySelector(".nav-item i.fa-user");
const passwordBtn = document.getElementById("passwordBtn");
const iconPasswordBtn = document.querySelector(".nav-item i.fa-lock");
const myCardBtn = document.getElementById("myCardBtn");
const notificationBtn = document.getElementById("notificationBtn");
const reFundBtn = document.getElementById("refundBtn");

const linkBankBtn = document.querySelector(".bankBtn");
const linkBankPanel = document.querySelector(".link-bank");


const overlay = document.getElementById("overlay");
const otpPanel = document.querySelector(".otp-panel");
const passDonePanel = document.querySelector(".password-done");
const reInputPanel = document.querySelector(".reinput-pass");
const retrievePasswordPanel = document.querySelector(".retrieve-password");
const changePasswordPanel = document.getElementById("password-panel");
const securityPanel = document.getElementById("security-panel");
const retrievePasswordBtn = document.querySelector(".change-password-Btn");
const changePasswordPanelBtn = document.querySelector(".tab-link-password");
const securityBtn = document.querySelector(".tab-link-security");
const Xbutton = document.querySelector(".fa-xmark");

const emailNotiPanel = document.getElementById("emailNotiPanel");
const smsNotiPanel = document.getElementById("smsNotiPanel");
const emailNotiBtn = document.getElementById("emailNotiBtn");
const smsNotiBtn = document.getElementById("smsNotiBtn");

const navBtns = document.querySelectorAll(".nav-item");

//Card List
const creditCard1 = document.getElementById("credit-card-1");
const creditCard2 = document.getElementById("credit-card-2");
const creditCard3 = document.getElementById("credit-card-3");
const InputCardPanel = document.querySelectorAll(".inputBankBox");
navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        navBtns.forEach(bt => {
            if (bt.classList.contains("nav-item-selected"))
                bt.classList.remove("nav-item-selected");
        });
        btn.classList.add("nav-item-selected");
    });
});

//Start the code
alltheSections.forEach(element => {
    element.style.display = "none";
});
section1.style.display = "flex";
overlay.style.display = "none";
changePasswordPanel.style.display = "none";
smsNotiPanel.style.display = "none";
emailNotiBtn.classList.add("title-selected");
securityBtn.classList.add("title-selected");
profileBtn.classList.add("nav-item-selected");
//Nút Hồ sơ
profileBtn.onclick = function () {
    alltheSections.forEach(element => {
        element.style.display = "none";
    });
    section1.style.display = "flex";
    // profileBtn.style.background = "#34699a";
    // profileBtn.style.color = "white";
    // iconProfileBtn.style.color = "white";

}
//Nút bảo mật và Mật khẩu
passwordBtn.onclick = function () {
    alltheSections.forEach(element => {
        element.style.display = "none";
    });
    //alert('Clicked!!!!!!');
    section2.style.display = "flex";
    // passwordBtn.style.background = "#34699a";
    // passwordBtn.style.color = "white";
    // iconPasswordBtn.style.color = "white";
};
myCardBtn.onclick = function () {
    alltheSections.forEach(element => {
        element.style.display = "none";
    });
    //alert('Clicked!!!!!!');
    section3.style.display = "flex";
};

notificationBtn.onclick = function () {
    alltheSections.forEach(element => {
        element.style.display = "none";
    });
    section6.style.display = "flex";
};
// Refund
reFundBtn.onclick = function () {
    alltheSections.forEach(element => {
        element.style.display = "none";
    });
    section5.style.display = "flex";
}

// Liên kết ngân hàng
if (linkBankBtn) {
    linkBankPanel.style.display = "none";
    linkBankBtn.addEventListener("click", () => {
        section5.style.display = "none";
        linkBankPanel.style.display = "flex";
    })
}

// Refund

changePasswordPanelBtn.onclick = function () {
    changePasswordPanelBtn.classList.add("title-selected");
    securityBtn.classList.remove("title-selected");
    securityPanel.style.display = "none";
    changePasswordPanel.style.display = "block";
};
securityPanel.style.display = "block";
securityPanel.style.color = "#34699a";
securityBtn.style.borderBottom = "block";
securityBtn.onclick = function () {
    securityBtn.classList.add("title-selected");
    changePasswordPanelBtn.classList.remove("title-selected");
    changePasswordPanel.style.display = "none";
    securityPanel.style.display = "block";
    securityPanel.style.color = "#34699a";
    securityBtn.style.borderBottom = "block";

};
retrievePasswordBtn.onclick = function () {
    overlay.style.display = "flex";
    otpPanel.style.display = "none";
    retrievePasswordPanel.style.display = "block";
    reInputPanel.style.display = "none";
    passDonePanel.style.display = "none";
};
Xbutton.onclick = function () {
    overlay.style.display = "none";
};
//Notification Buttons
const toggles = document.querySelectorAll(".toggle");

toggles.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");

        if (btn.classList.contains("active")) {
            btn.classList.replace("fa-toggle-off", "fa-toggle-on");
        } else {
            btn.classList.replace("fa-toggle-on", "fa-toggle-off");
        }
    });
});
emailNotiBtn.onclick = function () {
    emailNotiBtn.classList.add("title-selected");
    smsNotiBtn.classList.remove("title-selected");
    smsNotiPanel.style.display = "none";
    emailNotiPanel.style.display = "flex";
}
smsNotiBtn.onclick = function () {
    smsNotiBtn.classList.add("title-selected");
    emailNotiBtn.classList.remove("title-selected");
    emailNotiPanel.style.display = "none";
    smsNotiPanel.style.display = "flex";
}
// Khi bấm "Đổi mật khẩu"
// changePasswordPanelBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     securityPanel.style.display = "none";
//     changePasswordPanel.style.display = "block";
//     changePasswordPanel.style.borderBottom = "2px solid #34699A";
//     changePasswordPanel.style.color = "#34699A";
//     securityBtn.style.color = "grey";
//     securityBtn.style.borderBottom = "none";
//     reInputPanel.style.display="none";
// });

// Chuyển tab quên mật khẩu 2 -> nhập OTP
if (otpPanel && retrievePasswordPanel) {
    otpPanel.style.display = "none";
    retrievePasswordPanel.style.display = "block";

    const continueBtn = document.querySelector(".btn-continue");
    const closeOverlay2 = document.querySelector(".enter-otp i.fa-xmark");
    const otpbackBtn = document.querySelector(".enter-otp p");


    if (continueBtn) {
        continueBtn.addEventListener("click", () => {
            otpPanel.style.display = "block";
            retrievePasswordPanel.style.display = "none";
        });
    }

    if (closeOverlay2) {
        closeOverlay2.addEventListener("click", () => {
            overlay.style.display = "none";
        });
    }

    if (otpbackBtn) {
        otpbackBtn.addEventListener("click", () => {
            otpPanel.style.display = "none";
            retrievePasswordPanel.style.display = "block";
        });
    }

    // Chuyển tab quên mật khẩu 3 -> nhập mk mới
    if (reInputPanel) {
        reInputPanel.style.display = "none";
        retrievePasswordPanel.style.display = "block";

        const verifyBtn = document.querySelector(".btn-verify");
        const closeOverlay3 = document.querySelector(".input-newpass i.fa-xmark");
        if (verifyBtn) {
            verifyBtn.addEventListener("click", () => {
                reInputPanel.style.display = "block";
                otpPanel.style.display = "none";
                retrievePasswordPanel.style.display = "none";
            });
        }
        if (closeOverlay3) {
            closeOverlay3.addEventListener("click", () => {
                overlay.style.display = "none";
                reInputPanel.style.display = "none";
            })
        }
    }

    // Chuyển tab quên mật 4 -> done
    if (passDonePanel) {
        passDonePanel.style.display = "none";
        reInputPanel.style.display = "block";

        const donePassBtn = document.querySelector(".btn-newpass-verify");
        if (donePassBtn) {
            donePassBtn.addEventListener("click", () => {
                reInputPanel.style.display = "none";
                passDonePanel.style.display = "flex";
            })
        }
    }
    const outPanel = document.querySelector(".btn-done");
    if (outPanel) {
        outPanel.addEventListener("click", () => {
            overlay.style.display = "none";
        })
    }
}


// Ẩn/hiện mật khẩu
const eyeIcons = document.querySelectorAll(".input-eyes i");
eyeIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        } else {
            input.type = "password";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        }
    });
});

//Set input box credit card

function togglePanel(cardClass) {
    InputCardPanel.forEach(panel => {
        if (panel.classList.contains(cardClass)) {

            const isOpen = panel.classList.toggle("active");
            //  panel.style.display = isOpen ? "flex" : "none";
            panel.style.opacity = isOpen ? "1" : "0";
            panel.style.height = isOpen ? "fit-content" : "0";
        } else {
            panel.classList.remove("active");
            // panel.style.display = "none";
            panel.style.opacity = "0";
            panel.style.height = "0"
        }
    });
}

// Detect double click manually
function addDoubleClickHandler(element, panelClass) {
    let clickCount = 0;
    let timer = null;

    element.addEventListener("click", function () {
        clickCount++;
        if (clickCount === 1) {
            timer = setTimeout(() => {
                //single click
                togglePanel(panelClass);
                clickCount = 0;
            }, 500);
        } else if (clickCount === 2) {
            clearTimeout(timer);
            //double click
            InputCardPanel.forEach(panel => {
                if (panel.classList.contains(panelClass)) {
                    panel.classList.remove("active");
                    panel.style.display = "none";
                }
            });
            clickCount = 0;
        }
    });
}

addDoubleClickHandler(creditCard1, "credit-card-1");
addDoubleClickHandler(creditCard2, "credit-card-2");
addDoubleClickHandler(creditCard3, "credit-card-3");



