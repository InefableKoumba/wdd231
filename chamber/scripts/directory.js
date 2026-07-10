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

      // Top row container (name + tagline)
      const topSection = document.createElement("div");
      topSection.classList.add("card-top");

      const h3 = document.createElement("h3");
      h3.textContent = member.name;

      const pTagline = document.createElement("p");
      pTagline.textContent = member.additionalInfo;
      pTagline.classList.add("tagline");

      topSection.appendChild(h3);
      topSection.appendChild(pTagline);

      // Bottom row container (image + contact info)
      const bottomSection = document.createElement("div");
      bottomSection.classList.add("card-bottom");

      const img = document.createElement("img");
      img.src = `images/${member.image}`;
      img.alt = `${member.name} Logo`;
      img.loading = "lazy";
      img.width = "100";
      img.height = "100";

      const infoSection = document.createElement("div");
      infoSection.classList.add("card-info");

      const pEmail = document.createElement("p");
      pEmail.innerHTML = `<strong>EMAIL:</strong> info@${member.website.replace('https://', '')}`;
      
      const pPhone = document.createElement("p");
      pPhone.innerHTML = `<strong>PHONE:</strong> ${member.phone}`;
      
      const pURL = document.createElement("p");
      pURL.innerHTML = `<strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a>`;

      infoSection.appendChild(pEmail);
      infoSection.appendChild(pPhone);
      infoSection.appendChild(pURL);

      bottomSection.appendChild(img);
      bottomSection.appendChild(infoSection);

      // Build card
      card.appendChild(topSection);
      card.appendChild(bottomSection);

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
