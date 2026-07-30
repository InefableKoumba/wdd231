document.addEventListener("DOMContentLoaded", () => {
  // Set hidden timestamp field with ISO string or formatted date string
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    const now = new Date();
    timestampField.value = now.toISOString();
  }

  // Modal open and close handlers
  const openModalButtons = document.querySelectorAll(".open-modal-btn");
  const closeModalButtons = document.querySelectorAll(".close-modal-btn");

  openModalButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("dialog");
      if (modal) {
        modal.close();
      }
    });
  });

  // Close dialog when clicking outside (on backdrop)
  const dialogs = document.querySelectorAll("dialog");
  dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
      const dialogBounds = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogBounds.left ||
        e.clientX > dialogBounds.right ||
        e.clientY < dialogBounds.top ||
        e.clientY > dialogBounds.bottom
      ) {
        dialog.close();
      }
    });
  });
});
