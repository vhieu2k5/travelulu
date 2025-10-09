const alltheSections = document.querySelectorAll(".container");
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");
const section6 = document.querySelector(".section-6");

const profileBtn = document.getElementById("profileBtn");
const passwordBtn = document.getElementById("passwordBtn");
const myCardBtn = document.getElementById("myCardBtn");
const notificationBtn = document.getElementById("notificationBtn");

const overlay = document.getElementById("overlay");
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

//Start the code
  alltheSections.forEach(element => {
        element.style.display="none";
    });
section1.style.display="flex";
overlay.style.display="none";
changePasswordPanel.style.display="none";
smsNotiPanel.style.display="none";
emailNotiBtn.classList.add("title-selected");
securityBtn.classList.add("title-selected");
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
notificationBtn.onclick = function(){
    alltheSections.forEach(element =>{
        element.style.display="none";
    });
    section6.style.display="flex";
}
changePasswordPanelBtn.onclick = function(){
    changePasswordPanelBtn.classList.add("title-selected");
    securityBtn.classList.remove("title-selected");
    securityPanel.style.display ="none";
    changePasswordPanel.style.display="block";
};
securityBtn.onclick = function(){
   securityBtn.classList.add("title-selected");
    changePasswordPanelBtn.classList.remove("title-selected");
    changePasswordPanel.style.display="none";
    securityPanel.style.display="block";
};
retrievePasswordBtn.onclick = function(){
    overlay.style.display="flex";
};
Xbutton.onclick = function(){
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
emailNotiBtn.onclick = function(){
    emailNotiBtn.classList.add("title-selected");
    smsNotiBtn.classList.remove("title-selected");
    smsNotiPanel.style.display="none";
    emailNotiPanel.style.display="flex";
}
smsNotiBtn.onclick = function(){
  smsNotiBtn.classList.add("title-selected");
    emailNotiBtn.classList.remove("title-selected");
     emailNotiPanel.style.display="none";
    smsNotiPanel.style.display="flex";
}


