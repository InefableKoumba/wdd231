import { initializeCommonUI } from "./main.js";
import { isFavorite, toggleFavorite } from "./storage.js";
import { initializeModal, openPhotoModal } from "./modal.js";

let allPhotos = [];

document.addEventListener("DOMContentLoaded", () => {
  initializeCommonUI();
  initializeModal();
  fetchPhotosData();

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      filterAndRenderPhotos(category, getSearchQuery());
    });
  });

  const searchInput = document.querySelector("#search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const activeCategory =
        document
          .querySelector(".filter-btn.active")
          ?.getAttribute("data-category") || "All";
      filterAndRenderPhotos(activeCategory, query);
    });
  }
});

function getSearchQuery() {
  return (
    document.querySelector("#search-input")?.value.toLowerCase().trim() || ""
  );
}

async function fetchPhotosData() {
  const galleryGrid = document.querySelector("#gallery-grid");
  if (galleryGrid) {
    galleryGrid.innerHTML =
      '<p class="loading-state">Loading photo collection...</p>';
  }

  try {
    const response = await fetch("./data/photos.json");
    if (!response.ok) {
      throw new Error(`HTTP Error status: ${response.status}`);
    }
    allPhotos = await response.json();
    renderGallery(allPhotos);
  } catch (error) {
    console.error("Failed to load photos:", error);
    if (galleryGrid) {
      galleryGrid.innerHTML = `<p class="error-state">Error loading gallery photos. Please try again later.</p>`;
    }
  }
}

function filterAndRenderPhotos(category, query) {
  let filtered = allPhotos;

  if (category && category !== "All") {
    filtered = filtered.filter(
      (photo) => photo.category.toLowerCase() === category.toLowerCase(),
    );
  }

  if (query) {
    filtered = filtered.filter(
      (photo) =>
        photo.title.toLowerCase().includes(query) ||
        photo.photographer.toLowerCase().includes(query) ||
        photo.description.toLowerCase().includes(query) ||
        photo.location.toLowerCase().includes(query),
    );
  }

  renderGallery(filtered);
}

function renderGallery(photos) {
  const galleryGrid = document.querySelector("#gallery-grid");
  const photoCountEl = document.querySelector("#photo-count");

  if (!galleryGrid) return;

  if (photoCountEl) {
    photoCountEl.textContent = `Displaying ${photos.length} photo${photos.length !== 1 ? "s" : ""}`;
  }

  if (photos.length === 0) {
    galleryGrid.innerHTML =
      '<p class="empty-state">No photos match your current filters.</p>';
    return;
  }

  galleryGrid.innerHTML = photos
    .map((photo) => {
      const fav = isFavorite(photo.id);
      return `
            <article class="photo-card" data-id="${photo.id}">
                <div class="card-img-wrapper">
                    <img src="${photo.thumbnail}" alt="${photo.title}" loading="lazy" width="400" height="300">
                    <span class="category-tag">${photo.category}</span>
                    <button class="favorite-btn ${fav ? "is-favorite" : ""}" aria-label="Toggle Favorite" data-id="${photo.id}">
                        ${fav ? "❤️" : "🤍"}
                    </button>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${photo.title}</h3>
                    <div class="card-meta">
                        <span>${photo.photographer}</span>
                        <span>${photo.date}</span>
                    </div>
                    <p class="card-description">${photo.description}</p>
                    <button class="view-details-btn" data-id="${photo.id}">View Details</button>
                </div>
            </article>
        `;
    })
    .join("");

  galleryGrid.querySelectorAll(".view-details-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const photoId = btn.getAttribute("data-id");
      const photo = allPhotos.find((p) => p.id === photoId);
      if (photo) {
        openPhotoModal(photo);
      }
    });
  });

  galleryGrid.querySelectorAll(".favorite-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const photoId = btn.getAttribute("data-id");
      const photo = allPhotos.find((p) => p.id === photoId);
      if (photo) {
        const updated = toggleFavorite(photo);
        const isFavNow = updated.some((item) => item.id === photoId);
        btn.classList.toggle("is-favorite", isFavNow);
        btn.innerHTML = isFavNow ? "❤️" : "🤍";
      }
    });
  });
}
