// chamber/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.querySelector("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuBtn.textContent = nav.classList.contains("open") ? "✖" : "☰";
    });
  }

  // Dark Mode Toggle
  const darkModeBtn = document.getElementById("dark-mode-btn");
  if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌓";
    });
  }

  // Footer Dates
  const yearSpan = document.getElementById("currentyear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const lastModifiedSpan = document.getElementById("lastModified");
  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = "Last Modification: " + document.lastModified;
  }
});
