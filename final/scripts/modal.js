export function initializeModal() {
  const modal = document.querySelector("#photo-modal");
  const closeBtn = document.querySelector("#modal-close-btn");

  if (modal && closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.close();
    });

    modal.addEventListener("click", (event) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        modal.close();
      }
    });
  }
}

export function openPhotoModal(photo) {
  const modal = document.querySelector("#photo-modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalImg = document.querySelector("#modal-img");
  const modalCategory = document.querySelector("#modal-category");
  const modalPhotographer = document.querySelector("#modal-photographer");
  const modalDate = document.querySelector("#modal-date");
  const modalLocation = document.querySelector("#modal-location");
  const modalCamera = document.querySelector("#modal-camera");
  const modalDescription = document.querySelector("#modal-description");

  if (!modal) return;

  if (modalTitle) modalTitle.textContent = photo.title;
  if (modalImg) {
    modalImg.src = photo.url;
    modalImg.alt = photo.title;
  }
  if (modalCategory) modalCategory.textContent = photo.category;
  if (modalPhotographer) modalPhotographer.textContent = photo.photographer;
  if (modalDate) modalDate.textContent = photo.date;
  if (modalLocation) modalLocation.textContent = photo.location;
  if (modalCamera) modalCamera.textContent = photo.camera;
  if (modalDescription) modalDescription.textContent = photo.description;

  modal.showModal();
}
