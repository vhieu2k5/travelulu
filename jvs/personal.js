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
const logOutBtn = document.getElementById("log_outBtn");
const logOutPanel = document.getElementById("logout");
const nologOut = document.getElementById("no");
const yeslogOut = document.getElementById("yes");
const backBtn = document.querySelector(".back-link");
const deleteAccBtn = document.querySelector(".delete-account span2");
const deleteAccPanel = document.getElementById("deleteAccPanel");
const noDelete = document.getElementById("noDelete");
const yesDelete = document.getElementById("yesDelete");

const linkBankBtn = document.querySelector(".bankBtn");
const linkBankPanel = document.querySelector(".link-bank");
const dropDownBtn = document.getElementById("downBtn");
const dropDownPanel = document.getElementById("downPanel");
const SaveBtnLinkBank = document.querySelector("#link-bank-panel button");
const linkedBankPanel = document.getElementById("linked-bank-panel");
const linkBankPanel_son = document.getElementById("link-bank-panel");


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

}
//Nút bảo mật và Mật khẩu
passwordBtn.onclick = function () {
    alltheSections.forEach(element => {
        element.style.display = "none";
    });

    section2.style.display = "flex";
};
// Xóa tài khoản
if(deleteAccBtn){
    deleteAccPanel.style.display = "none";
    deleteAccBtn.addEventListener("click", () => {
        deleteAccPanel.style.display = "flex";
    })
    noDelete.addEventListener("click", () => {
        deleteAccPanel.style.display = "none";
    })
}

myCardBtn.onclick = function () {
    alltheSections.forEach(element => {
        element.style.display = "none";
    });

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
    // Wait-processing -- processing - processed
document.querySelectorAll(".refund-tabs a").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll(".refund-tabs a").forEach(el => el.classList.remove("active"));
    a.classList.add("active");
  });
});

// Link-bank BACK -> Refund
if(backBtn){
    section5.style.display = "none";
    backBtn.addEventListener("click", () => {
        section5.style.display = "flex";
        linkBankPanel.style.display = "none";
    })
}
// Refund -> DROPDOWN
if (dropDownBtn && dropDownPanel) {
    dropDownPanel.style.display = "none";
    let isOpen = false; 

    dropDownBtn.addEventListener("click", () => {
        isOpen = !isOpen;

        if (isOpen) {
        dropDownPanel.style.display = "block"; 
        dropDownBtn.style.transform = "rotate(180deg)"; 
        } else {
        dropDownPanel.style.display = "none"; 
        dropDownBtn.style.transform = "rotate(0deg)"; 
        }
    });
}
// Linked-Bank thành công
if(SaveBtnLinkBank){
    linkedBankPanel.style.display = "none";
    SaveBtnLinkBank.addEventListener("click", () => {
        linkBankPanel_son.style.display = "none";
        linkedBankPanel.style.display = "flex";
    })
    backBtn.addEventListener("click", () => {
        linkBankPanel_son.style.display = "block";
        linkedBankPanel.style.display = "none";
    })
}

// Đăng xuất
if(logOutBtn){
    logOutPanel.style.display = "none";
    logOutBtn.addEventListener("click", () => {
        logOutPanel.style.display = "flex";
    })
    nologOut.addEventListener("click", () => {
        logOutPanel.style.display = "none";
    })
}

// Liên kết ngân hàng
if (linkBankBtn) {
    linkBankPanel.style.display = "none";
    linkBankBtn.addEventListener("click", () => {
        section5.style.display = "none";
        linkBankPanel.style.display = "flex";
    })
}

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



