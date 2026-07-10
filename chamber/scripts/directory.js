// chamber/js/directory.js

document.addEventListener("DOMContentLoaded", () => {
  const url = "data/members.json";
  const membersContainer = document.getElementById("members-container");
  const gridBtn = document.getElementById("grid-view-btn");
  const listBtn = document.getElementById("list-view-btn");

  async function getMembers() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayMembers(data);
    } catch (error) {
      console.error("Error fetching member data:", error);
      membersContainer.innerHTML = "<p>Failed to load member data.</p>";
    }
  }

  function displayMembers(members) {
    membersContainer.innerHTML = ""; // Clear existing

    members.forEach((member) => {
      // Create elements
      const card = document.createElement("section");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = `images/${member.image}`;
      img.alt = `${member.name} Logo`;
      img.loading = "lazy";
      img.width = "150";
      img.height = "auto";

      const h3 = document.createElement("h3");
      h3.textContent = member.name;

      const pTagline = document.createElement("p");
      pTagline.textContent = member.additionalInfo;
      pTagline.style.fontStyle = "italic";
      pTagline.style.fontSize = "0.8rem";

      const pEmail = document.createElement("p");
      pEmail.innerHTML = `<strong>EMAIL:</strong> info@${member.website.replace('https://', '')}`;
      
      const pPhone = document.createElement("p");
      pPhone.innerHTML = `<strong>PHONE:</strong> ${member.phone}`;
      
      const pURL = document.createElement("p");
      pURL.innerHTML = `<strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a>`;

      // Build card
      card.appendChild(h3);
      card.appendChild(pTagline);
      card.appendChild(img);
      card.appendChild(pEmail);
      card.appendChild(pPhone);
      card.appendChild(pURL);

      membersContainer.appendChild(card);
    });
  }

  // View Toggles
  if (gridBtn && listBtn) {
    gridBtn.addEventListener("click", () => {
      membersContainer.classList.remove("list");
      gridBtn.classList.add("active");
      listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
      membersContainer.classList.add("list");
      listBtn.classList.add("active");
      gridBtn.classList.remove("active");
    });
  }

  // Initialize
  getMembers();
});
