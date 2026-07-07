const menuButton = document.getElementById("menu");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("open");
  nav.classList.toggle("open");
});
