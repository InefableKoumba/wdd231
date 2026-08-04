export function initializeCommonUI() {
  const menuToggle = document.querySelector("#menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const isOpen = navMenu.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", isOpen.toString());
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });
  }

  const currentYearEl = document.querySelector("#currentyear");
  const lastModifiedEl = document.querySelector("#lastModified");

  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear().toString();
  }

  if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last modified: ${document.lastModified}`;
  }
}
