import { initializeCommonUI } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeCommonUI();

  const params = new URLSearchParams(window.location.search);
  const resultsContainer = document.querySelector("#form-results");

  if (!resultsContainer) return;

  const fullname = params.get("fullname");
  const email = params.get("email");
  const favcategory = params.get("favcategory");
  const rating = params.get("rating");
  const comments = params.get("comments");
  const timestamp = params.get("timestamp");

  if (!fullname && !email) {
    resultsContainer.innerHTML =
      '<p class="error-state">No form data submitted. Please visit the <a href="about.html" class="accent-link">Feedback Form</a> page.</p>';
    return;
  }

  const formattedDate = timestamp
    ? new Date(timestamp).toLocaleString()
    : new Date().toLocaleString();

  resultsContainer.innerHTML = `
        <dl class="results-list">
            <div class="result-item">
                <dt>Full Name:</dt>
                <dd>${escapeHtml(fullname)}</dd>
            </div>
            <div class="result-item">
                <dt>Email Address:</dt>
                <dd>${escapeHtml(email)}</dd>
            </div>
            <div class="result-item">
                <dt>Favorite Category:</dt>
                <dd>${escapeHtml(favcategory)}</dd>
            </div>
            <div class="result-item">
                <dt>Rating:</dt>
                <dd>${escapeHtml(rating)} / 5 ⭐</dd>
            </div>
            <div class="result-item">
                <dt>Submitted Comments:</dt>
                <dd class="result-comment">${escapeHtml(comments)}</dd>
            </div>
            <div class="result-item">
                <dt>Submission Timestamp:</dt>
                <dd class="result-timestamp">${formattedDate}</dd>
            </div>
        </dl>
    `;
});

function escapeHtml(str) {
  if (!str) return "N/A";
  return str.replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m];
  });
}
