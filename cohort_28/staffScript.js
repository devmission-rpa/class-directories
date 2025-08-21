"use strict";

async function getAllRecords() {
  // Define a color palette for footers
  const colorPalette = ["#5ebab7", "#ffd238", "#E5007E", "#684995", "#fb815c"];

  // Get the containers where the cards will be displayed
  let getStaffBox1 = document.getElementById("staffBox1");
  let getStaffBox2 = document.getElementById("staffBox2");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patL1XjEkiezY5YHv.a8da02d6fab652f0daf53682ff1fe929eb5b371852dbce554b0f2f03f9b421a6`,
    },
  };

  await fetch(`https://api.airtable.com/v0/appEvoTvbpggMe3uz/Staff`, options) // API Link
    .then((response) => response.json())
    .then((data) => {
      console.log(data.records);

      // Clear any existing content inside the containers
      getStaffBox1.innerHTML = "";
      getStaffBox2.innerHTML = "";

      let cardElemBox1 = `<div class="card-container">`;
      let cardElemBox2 = `<div class="card-container">`;

      // Split the data into two halves
      let half = Math.ceil(data.records.length / 2);
      let firstHalf = data.records.slice(0, half);
      let secondHalf = data.records.slice(half);

      // Loop through first half to create flip cards for box 1
      firstHalf.forEach((record, index) => {
        let staffName = record.fields["Name"];
        let staffPosition = record.fields["Position"];
        let staffPhoto = record.fields["Headshot"];
        let staffLinkedin = record.fields["LinkedIn"];

        // Get dynamic footer color
        const footerColor = colorPalette[index % colorPalette.length];

        cardElemBox1 += `
          <div class="flip-card">
            <div class="flip-card-inner">
            
              <!-- Front of the Card -->
              <div class="flip-card-front">
                <img 
                  src="${staffPhoto[0].url}" 
                  alt="profile image"
                >
                <footer style="background-color: ${footerColor};">${staffName}</footer>
              </div>
              
              <!-- Back of the Card -->
              <div class="flip-card-back">
                <div class="quote">
                  <a>${staffPosition}</a>
                </div>
                <footer style="background-color: ${footerColor};">
                  <a href="${staffLinkedin}" class="social-icon" target="_blank">
                    <img src="https://cdn.glitch.global/dc4e1fc5-5add-4d75-8dab-56fa049fe306/LinkedIn_logo_initials.png?v=1732147125031">
                  </a>
                </footer>
              </div>
            </div>
          </div>
        `;
      });

      // Loop through second half to create flip cards for box 2
      secondHalf.forEach((record, index) => {
        let staffName = record.fields["Name"];
        let staffPosition = record.fields["Position"];
        let staffPhoto = record.fields["Headshot"];
        let staffLinkedin = record.fields["LinkedIn"];

        // Get dynamic footer color
        const footerColor = colorPalette[index % colorPalette.length];

        cardElemBox2 += `
          <div class="flip-card">
            <div class="flip-card-inner">
            
              <!-- Front of the Card -->
              <div class="flip-card-front">
                <img 
                  src="${staffPhoto[0].url}" 
                  alt="profile image"
                >
                <footer style="background-color: ${footerColor};">${staffName}</footer>
              </div>
              
              <!-- Back of the Card -->
              <div class="flip-card-back">
                <div class="quote">
                    <a>${staffPosition}</a>
                  </div>
                <footer style="background-color: ${footerColor};">
                  <a href="${staffLinkedin}" class="social-icon" target="_blank">
                    <img src="https://cdn.glitch.global/dc4e1fc5-5add-4d75-8dab-56fa049fe306/LinkedIn_logo_initials.png?v=1732147125031">
                  </a>
                </footer>
              </div>
            </div>
          </div>
        `;
      });

      // Close grid-container for both boxes
      cardElemBox1 += `</div>`;
      cardElemBox2 += `</div>`;

      // Inject the cards into the respective containers
      getStaffBox1.innerHTML = cardElemBox1;
      getStaffBox2.innerHTML = cardElemBox2;
    })
    .catch((error) => console.error("Error fetching Airtable data:", error));
}

getAllRecords();
