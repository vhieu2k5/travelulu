document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach(el => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Không thể tải ${file}`);
        return res.text();
      })
      .then(data => {
        el.innerHTML = data;

        //chèn xong header rồi mới update link
        const personalLink = document.getElementById("personal-site");
        if (personalLink) {
          if (Loader.isLoaded) {
            personalLink.href = "personal.html";
            personalLink.textContent = "Cá nhân";
          } else {
            personalLink.href = "login.html";
            personalLink.textContent = "Đăng nhập";
          }
        }
      })
      .catch(err => console.error("Lỗi include:", err));
  });
});


class Loader {
  static get isLoaded() {
    return sessionStorage.getItem("isLoaded") === "true";
  }
  static set isLoaded(value) {
    sessionStorage.setItem("isLoaded", value);
  }
}
