document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("#togglePassword");
  const pass = document.querySelector("#passwordInput");

  if (!toggle || !pass) return;

  toggle.addEventListener("click", () => {
    const isHidden = pass.type === "password";
    pass.type = isHidden ? "text" : "password";
    toggle.classList.toggle("fa-eye");
    toggle.classList.toggle("fa-eye-slash");
  });
});
