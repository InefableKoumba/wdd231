import { itemsOfInterest } from "../data/items.mjs";

document.addEventListener("DOMContentLoaded", () => {
  handleVisitorMessage();
  renderItemsOfInterest();
});

function handleVisitorMessage() {
  const messageContainer = document.getElementById("visit-message");
  if (!messageContainer) return;

  const LAST_VISIT_KEY = "chamber_discover_last_visit";
  const now = Date.now();
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const lastVisitTime = parseInt(lastVisit, 10);
    const timeDifferenceMs = now - lastVisitTime;
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor(timeDifferenceMs / msPerDay);

    if (daysBetween < 1) {
      message = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysBetween} days ago.`;
    }
  }

  localStorage.setItem(LAST_VISIT_KEY, now.toString());

  messageContainer.innerHTML = `
        <div class="visit-banner">
            <p>${message}</p>
            <button id="close-banner-btn" aria-label="Close Visit Banner">✕</button>
        </div>
    `;

  const closeBtn = document.getElementById("close-banner-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      messageContainer.style.display = "none";
    });
  }
}

function renderItemsOfInterest() {
  const container = document.getElementById("discover-gallery");
  if (!container) return;

  container.innerHTML = itemsOfInterest
    .map(
      (item, index) => `
        <article class="discover-card card-${index + 1}">
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.alt}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more-btn">learn more</button>
        </article>
    `,
    )
    .join("");
}
