document.addEventListener("DOMContentLoaded", () => {
  const currentUrl = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  const container = document.getElementById("submission-results");

  if (!container) return;

  const requiredFields = [
    { key: "fname", label: "First Name" },
    { key: "lname", label: "Last Name" },
    { key: "email", label: "Email Address" },
    { key: "phone", label: "Mobile Phone" },
    { key: "organization", label: "Business / Organization Name" },
    { key: "timestamp", label: "Date & Time Submitted" },
  ];

  let html = `<div class="thankyou-card">
    <h2>Submitted Registration Details</h2>
    <dl class="results-list">`;

  requiredFields.forEach((field) => {
    let value = urlParams.get(field.key);
    if (value) {
      if (field.key === "timestamp") {
        try {
          const dateObj = new Date(value);
          if (!isNaN(dateObj.getTime())) {
            value = dateObj.toLocaleString();
          }
        } catch (e) {}
      }
      html += `<dt>${field.label}:</dt><dd>${escapeHtml(value)}</dd>`;
    } else {
      html += `<dt>${field.label}:</dt><dd class="missing">Not provided</dd>`;
    }
  });

  const membershipVal = urlParams.get("membership");
  if (membershipVal) {
    const levelNames = {
      np: "NP Membership (Non-Profit)",
      bronze: "Bronze Membership",
      silver: "Silver Membership",
      gold: "Gold Membership",
    };
    const formattedLevel =
      levelNames[membershipVal.toLowerCase()] || membershipVal;
    html += `<dt>Membership Level:</dt><dd>${escapeHtml(formattedLevel)}</dd>`;
  }

  const orgtitle = urlParams.get("orgtitle");
  if (orgtitle) {
    html += `<dt>Organizational Title:</dt><dd>${escapeHtml(orgtitle)}</dd>`;
  }

  const desc = urlParams.get("description");
  if (desc) {
    html += `<dt>Description:</dt><dd>${escapeHtml(desc)}</dd>`;
  }

  html += `</dl></div>`;

  container.innerHTML = html;
});

function escapeHtml(string) {
  return String(string).replace(/[&<>"']/g, (s) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[s];
  });
}
