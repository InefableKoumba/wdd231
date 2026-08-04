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
      '<p class="error-state">No form data submitted. Please visit the <a href="about.html" style="color: var(--accent-amber);">Feedback Form</a> page.</p>';
    return;
  }

  const formattedDate = timestamp
    ? new Date(timestamp).toLocaleString()
    : new Date().toLocaleString();

  resultsContainer.innerHTML = `
        <dl class="results-list" style="display: grid; gap: 15px; background: var(--bg-primary); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div>
                <dt style="color: var(--accent-amber); font-weight: 700;">Full Name:</dt>
                <dd style="font-size: 1.1rem;">${escapeHtml(fullname)}</dd>
            </div>
            <div>
                <dt style="color: var(--accent-amber); font-weight: 700;">Email Address:</dt>
                <dd style="font-size: 1.1rem;">${escapeHtml(email)}</dd>
            </div>
            <div>
                <dt style="color: var(--accent-amber); font-weight: 700;">Favorite Category:</dt>
                <dd style="font-size: 1.1rem;">${escapeHtml(favcategory)}</dd>
            </div>
            <div>
                <dt style="color: var(--accent-amber); font-weight: 700;">Rating:</dt>
                <dd style="font-size: 1.1rem;">${escapeHtml(rating)} / 5 ⭐</dd>
            </div>
            <div>
                <dt style="color: var(--accent-amber); font-weight: 700;">Submitted Comments:</dt>
                <dd style="font-size: 1.05rem; white-space: pre-line;">${escapeHtml(comments)}</dd>
            </div>
            <div>
                <dt style="color: var(--accent-amber); font-weight: 700;">Submission Timestamp:</dt>
                <dd style="font-size: 0.95rem; color: var(--text-muted);">${formattedDate}</dd>
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
