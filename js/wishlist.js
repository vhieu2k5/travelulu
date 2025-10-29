const removeButtons = document.querySelectorAll(".removeButton");
const outputText = document.getElementById("OutputText");
const overlay = document.getElementById("overlay");
const cancelButton = document.getElementById("cancelButton");
const confirmButton = document.getElementById("confirmButton");
let num = removeButtons.length;
removeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.body.style.overflow = "hidden";
        overlay.style.display = "flex";
        const mainBox = btn.closest(".hover-box-overlay").parentElement;
        const tourName = mainBox.querySelector("b").innerText;

        outputText.innerText = "Bạn có chắc chắc xoá " + tourName + " khỏi danh sách yêu thích?";
        confirmButton.onclick = function () {
            overlay.style.display = "none";
            document.body.style.overflow = "";
            mainBox.style.display = "none";
            num--;
            nullwishlist();
        }
    });
});
cancelButton.onclick = function () {
    overlay.style.display = "none";
    document.body.style.overflow = "";
}
document.addEventListener("DOMContentLoaded", nullwishlist());

function nullwishlist() {
    
    console.log(num);
    if (num=== 0) {
        document.getElementById("nullWishlist").style.display = "flex";
        document.getElementById("mascot").style.opacity = 0;
    }
    else {
        document.getElementById("nullWishlist").style.display = "none";
        document.getElementById("mascot").style.opacity = 0.1;

    }
}
