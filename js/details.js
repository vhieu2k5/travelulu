const heartIcon = document.querySelector(".datvaicon i.fa-heart"); //icon trai tim
const darkPanel = document.querySelector(".darkpanel"); //bg den (cua phan trai tim va share)
const closeFavBtn = document.getElementById("closefav"); // nut dong tab fav
const favPanel = document.querySelector(".favouritebox"); // box fav
const unfavPanel = document.querySelector(".unfavouritebox"); // box unfav
const confirmRemove = document.getElementById("confirmRemove"); // nut xac nhan xoa khoi yeu thich (OK)
const cancelRemove = document.getElementById("cancelRemove"); //  nut huy bo (HUY)
const sharePanel = document.querySelector(".sharebox"); // box chia se tour
const closeShare = document.getElementById("close-sharebox"); // nut dong box chia se
const shareIcon = document.querySelector(".shareicon") //icon share
let liked = false; // check tinh trang cua icon trai tim

// bat dau cua phan lich trinh tour va chi tiet ve tour
const darkPanel1 = document.querySelector(".darkpanel1");
const tab_day = document.querySelectorAll(".daybutton");
const all_content = document.querySelectorAll(".content_day");
const closeLichtrinh = document.getElementById("close-lichtrinh");
const checkLichtrinh = document.querySelector(".xemlichtrinhdaydu");
const checktick_infoTab = document.querySelector(".xemchitietve");
const closetick_infoTab = document.getElementById("close-ticketinfo");
const ticketInfoTab = document.querySelector(".ticketinfo");
const popupLichTrinh = document.querySelector(".popup-lichtrinhtour")

tab_day.forEach((daybutton, index) => {
    daybutton.addEventListener("click", () => {
        tab_day.forEach(daybutton=>{daybutton.classList.remove("active")});
        daybutton.classList.add("active");
    
    all_content.forEach(content_day=>{content_day.classList.remove("active")});    
    all_content[index].classList.add("active");
    })
})

if (checkLichtrinh) {
    darkPanel1.style.display = "none";
    checkLichtrinh.addEventListener("click", () => {
        darkPanel1.style.display = "flex";
        popupLichTrinh.style.display = "flex";
        ticketInfoTab.style.display = "none";
    });
}

if (closeLichtrinh) {
    closeLichtrinh.addEventListener("click", () => {
        darkPanel1.style.display = "none";
    });
}

if (checktick_infoTab) {
    darkPanel1.style.display = "none";
    checktick_infoTab.addEventListener("click", () => {
        darkPanel1.style.display = "flex";
        popupLichTrinh.style.display = "none";
        ticketInfoTab.style.display = "flex"; 
    });
}

if (closetick_infoTab) {
    closetick_infoTab.addEventListener("click", () => {
        darkPanel1.style.display = "none";
    });
}
// ket thuc cua lich trinh tour va chi tiet ve tour


if (heartIcon) {
    darkPanel.style.display = "none";
    heartIcon.addEventListener("click", () => {
        darkPanel.style.display = "flex";
        if (!liked) {
            favPanel.style.display = "flex";
            unfavPanel.style.display = "none";
            sharePanel.style.display = "none";

            heartIcon.classList.toggle("fa-solid");
            heartIcon.style.color = "red";
            liked = true;
        }
        else {
            unfavPanel.style.display = "flex";
            favPanel.style.display = "none";
            sharePanel.style.display = "none";
        }
    })
}

if (closeFavBtn) {
    closeFavBtn.addEventListener("click", () => {
        darkPanel.style.display = "none";

    })
}
confirmRemove.onclick = function () {
    liked = false; 
    heartIcon.classList.remove("fa-solid");
    heartIcon.style.color = "black";
    darkPanel.style.display = "none";
    sharePanel.style.display = "none";
}
cancelRemove.onclick = function () {
    darkPanel.style.display = "none";
}

if(shareIcon){
    darkPanel.style.display = "none";
    shareIcon.addEventListener("click", () => {
        darkPanel.style.display = "flex";
        sharePanel.style.display = "flex";
        favPanel.style.display = "none";
        unfavPanel.style.display = "none";
    })
}

if(closeShare){
    closeShare.addEventListener("click", () => {
        darkPanel.style.display = "none";
    })
}