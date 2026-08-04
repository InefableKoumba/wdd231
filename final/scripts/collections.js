import { initializeCommonUI } from "./main.js";
import { getFavorites, toggleFavorite } from "./storage.js";
import { initializeModal, openPhotoModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeCommonUI();
  initializeModal();
  renderFavorites();
});

function renderFavorites() {
  const favorites = getFavorites();
  const galleryGrid = document.querySelector("#collections-grid");
  const totalCountEl = document.querySelector("#total-favorites-count");
  const categoriesCountEl = document.querySelector("#categories-count");
  const popularCategoryEl = document.querySelector("#popular-category");

  if (totalCountEl) totalCountEl.textContent = favorites.length.toString();

  if (categoriesCountEl) {
    const uniqueCategories = new Set(favorites.map((item) => item.category));
    categoriesCountEl.textContent = uniqueCategories.size.toString();
  }

  if (popularCategoryEl) {
    if (favorites.length === 0) {
      popularCategoryEl.textContent = "None";
    } else {
      const counts = favorites.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + 1;
        return acc;
      }, {});

      let topCategory = "";
      let maxCount = 0;
      for (const [cat, count] of Object.entries(counts)) {
        if (count > maxCount) {
          maxCount = count;
          topCategory = cat;
        }
      }
      popularCategoryEl.textContent = `${topCategory} (${maxCount})`;
    }
  }

  if (!galleryGrid) return;

  if (favorites.length === 0) {
    galleryGrid.innerHTML = `
            <div class="empty-favorites">
                <p>📷 You haven't saved any favorite photos yet!</p>
                <a href="index.html" class="cta-link">Explore Gallery & Save Memories</a>
            </div>
        `;
    return;
  }

  galleryGrid.innerHTML = favorites
    .map(
      (photo) => `
        <article class="photo-card" data-id="${photo.id}">
            <div class="card-img-wrapper">
                <img src="${photo.thumbnail}" alt="${photo.title}" loading="lazy" width="400" height="300">
                <span class="category-tag">${photo.category}</span>
                <button class="favorite-btn is-favorite" aria-label="Remove Favorite" data-id="${photo.id}">
                    ❤️
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
    `,
    )
    .join("");

  galleryGrid.querySelectorAll(".view-details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const photoId = btn.getAttribute("data-id");
      const photo = favorites.find((p) => p.id === photoId);
      if (photo) openPhotoModal(photo);
    });
  });

  galleryGrid.querySelectorAll(".favorite-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const photoId = btn.getAttribute("data-id");
      const photo = favorites.find((p) => p.id === photoId);
      if (photo) {
        toggleFavorite(photo);
        renderFavorites();
      }
    });
  });
}
