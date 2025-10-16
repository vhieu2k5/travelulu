const shareIcon = document.querySelector(".datvaticon img")
const darkPanel = document.querySelector(".darkpanel");
const sharePanel = document.querySelector(".sharebox");
const closeShare = document.getElementById("close-sharebox");

if(shareIcon){
    darkPanel.style.display = "none";
    shareIcon.addEventListener("click", () => {
        darkPanel.style.display = "flex";
        sharePanel.style.display = "flex";
    })
}

if(closeShare){

}