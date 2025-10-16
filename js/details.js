const heartIcon = document.querySelector(".datvaicon i.fa-heart");
const darkPanel = document.querySelector(".darkpanel");
const closeFavBtn = document.getElementById("closefav");
const favPanel = document.querySelector(".favouritebox");
const unfavPanel = document.querySelector(".unfavouritebox");
const confirmRemove = document.getElementById("confirmRemove");
const cancelRemove = document.getElementById("cancelRemove");
const sharePanel = document.querySelector(".sharebox");
const closeShare = document.getElementById("close-sharebox");
const shareIcon = document.querySelector(".shareicon")
let liked = false;

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