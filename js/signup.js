document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("#togglePassword1");
  const pass = document.querySelector("#passwordInput1");

  if (!toggle || !pass) return;

  toggle.addEventListener("click", () => {
    const isHidden = pass.type === "password";
    pass.type = isHidden ? "text" : "password";
    toggle.classList.toggle("fa-eye");
    toggle.classList.toggle("fa-eye-slash");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("#togglePassword2");
  const pass = document.querySelector("#passwordInput2");

  if (!toggle || !pass) return;

  toggle.addEventListener("click", () => {
    const isHidden = pass.type === "password";
    pass.type = isHidden ? "text" : "password";
    toggle.classList.toggle("fa-eye");
    toggle.classList.toggle("fa-eye-slash");
  });
});
