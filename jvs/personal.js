const alltheSections = document.querySelectorAll(".container");
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");
const profileBtn = document.getElementById("profileBtn");
const passwordBtn = document.getElementById("passwordBtn");
const myCardBtn = document.getElementById("myCardBtn");
const overlay = document.getElementById("overlay");
const retrievePasswordPanel = document.querySelector(".retrieve-password");
const changePasswordPanel = document.getElementById("password-panel");
const securityPanel = document.getElementById("security-panel");
const retrievePasswordBtn = document.querySelector(".change-password-Btn");
const changePasswordPanelBtn = document.querySelector(".tab-link-password");
const securityBtn = document.querySelector(".tab-link-security");
const Xbutton = document.querySelector(".fa-xmark");
//Start the code
  alltheSections.forEach(element => {
        element.style.display="none";
    });
section1.style.display="flex";
overlay.style.display="none";
changePasswordPanel.style.display="none";
//Nút Hồ sơ
profileBtn.onclick = function(){
    alltheSections.forEach(element => {
    element.style.display="none";
    });
section1.style.display="flex";
}
//Nút bảo mật và Mật khẩu
passwordBtn.onclick = function(){
    alltheSections.forEach(element => {
        element.style.display="none";
    });
    //alert('Clicked!!!!!!');
    section2.style.display ="flex"; 
};
myCardBtn.onclick = function(){
alltheSections.forEach(element => {
        element.style.display="none";
});
    //alert('Clicked!!!!!!');
    section3.style.display ="flex"; 
};
changePasswordPanelBtn.onclick = function(){
    changePasswordPanelBtn.style.color="var(--main-color)";
    securityBtn.style.color = "grey";
    securityBtn.style.border="none";
    changePasswordPanelBtn.style.borderBottom = "2px solid var(--main-color)";
    securityPanel.style.display ="none";
    changePasswordPanel.style.display="block";
};
securityBtn.onclick = function(){
    securityBtn.style.color="var(--main-color)";
    changePasswordPanelBtn.style.color = "grey";
    changePasswordPanelBtn.style.border="none";
    securityBtn.style.borderBottom = "2px solid var(--main-color)";
    changePasswordPanel.style.display="none";
    securityPanel.style.display="block";
};
retrievePasswordBtn.onclick = function(){
    overlay.style.display="flex";
};
Xbutton.onclick = function(){
    overlay.style.display = "none";
};

