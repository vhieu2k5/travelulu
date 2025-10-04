const alltheSections = document.querySelectorAll(".container");
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");
const profileBtn = document.getElementById("profileBtn");
const passwordBtn = document.getElementById("passwordBtn");
//Start the code
  alltheSections.forEach(element => {
        element.style.display="none";
    });
section1.style.display="flex";
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
