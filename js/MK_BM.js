document.addEventListener("DOMContentLoaded", () => {
    const tabSecurity = document.querySelector(".tab-link-security");
    const tabPassword = document.querySelector(".tab-link-password");
    const securityPanel = document.getElementById("security-panel");
    const passwordPanel = document.getElementById("password-panel");
    const passwordIcon = document.querySelector("#passwordBtn i");
    
    tabSecurity.style.borderBottom = "2px solid #34699A";
    tabSecurity.style.color = "#34699a";
    passwordPanel.style.display = "none";
    // Khi click “Mật khẩu & Bảo mật”
    const passwordBtn = document.getElementById("passwordBtn");
    if (passwordBtn) {
        passwordBtn.addEventListener("click", () => {
            tabSecurity.click();
            passwordBtn.style.background = "#34699A";
            passwordBtn.style.color = "white";
            passwordIcon.style.color = "white";
        });
    }
    
    // Khi bấm "Bảo mật"
    tabSecurity.addEventListener("click", (e) => {
        e.preventDefault();
        securityPanel.style.display = "block";
        passwordPanel.style.display = "none";
        tabSecurity.style.borderBottom = "2px solid #34699A";
        tabSecurity.style.color = "#34699A";
        tabPassword.style.color = "black";
        tabPassword.style.borderBottom = "none";
    });
    
    // Khi bấm "Đổi mật khẩu"
    tabPassword.addEventListener("click", (e) => {
        e.preventDefault();
        securityPanel.style.display = "none";
        passwordPanel.style.display = "block";
        tabPassword.style.borderBottom = "2px solid #34699A";
        tabPassword.style.color = "#34699A";
        tabSecurity.style.color = "black";
        tabSecurity.style.borderBottom = "none";
    });

        // Overlay quên mật khẩu
    const overlay = document.querySelector(".overlay");
    const forgotPassword = document.querySelector(".forgot-password");
    const closeOverlay1 = document.querySelector(".retrieval-panel i.fa-xmark");
    const otpPanel = document.querySelector(".otp-panel");
    const fogotPanel = document.querySelector(".retrieve-password");
    const reInputPanel = document.querySelector(".reinput-pass");
    const passDonePanel = document.querySelector(".password-done");

    if (overlay && forgotPassword && closeOverlay1) {
        overlay.style.display = "none";

        forgotPassword.addEventListener("click", (e) => {
            e.preventDefault();
            overlay.style.display = "flex";
            fogotPanel.style.display = "block";
            otpPanel.style.display = "none";
            reInputPanel.style.display = "none";
            passDonePanel.style.display = "none";
        });

        closeOverlay1.addEventListener("click", () => {
            overlay.style.display = "none";
        });
    }

        // Chuyển tab quên mật khẩu 2 -> nhập OTP
    if (otpPanel && fogotPanel) {
        otpPanel.style.display = "none";
        fogotPanel.style.display = "block";

        const continueBtn = document.querySelector(".btn-continue");
        const closeOverlay2 = document.querySelector(".enter-otp i.fa-xmark");
        const otpbackBtn = document.querySelector(".enter-otp p");


        if (continueBtn) {
            continueBtn.addEventListener("click", () => {
                otpPanel.style.display = "block";
                fogotPanel.style.display = "none";
            });
        }

        if (closeOverlay2) {
            closeOverlay2.addEventListener("click", () => {
                overlay.style.display = "none";
            });
        }

        if(otpbackBtn){
            otpbackBtn.addEventListener("click", () => {
                otpPanel.style.display = "none";
                fogotPanel.style.display = "block";
            });
        }

            // Chuyển tab quên mật khẩu 3 -> nhập mk mới
        if(reInputPanel){
            reInputPanel.style.display = "none";
            fogotPanel.style.display = "block";
            
            const verifyBtn = document.querySelector(".btn-verify");
            const closeOverlay3 = document.querySelector(".input-newpass i.fa-xmark");
            if(verifyBtn){
                verifyBtn.addEventListener("click", () => {
                    reInputPanel.style.display = "block";
                    otpPanel.style.display = "none";
                    fogotPanel.style.display = "none";
                });
            }
            if(closeOverlay3){
                closeOverlay3.addEventListener("click", () => {
                    overlay.style.display = "none";
                    reInputPanel.style.display = "none";
                })
            }
        }

            // Chuyển tab quên mật 4 -> done
        if(passDonePanel){
            passDonePanel.style.display = "none";
            reInputPanel.style.display = "block";

            const donePassBtn = document.querySelector(".btn-newpass-verify");
            if(donePassBtn){
                donePassBtn.addEventListener("click", () => {
                    reInputPanel.style.display = "none";
                    passDonePanel.style.display = "flex";
                })
            }
        }
        const outPanel = document.querySelector(".btn-done");
        if(outPanel){
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





});
