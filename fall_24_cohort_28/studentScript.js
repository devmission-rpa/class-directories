"use strict";
  const colorPalette = ['#5ebab7', '#ffd238', '#E5007E', '#684995', '#fb815c'];

async function getAllRecords() {
  // Get the containers where the cards will be displayed
  let getStudentsBox1 = document.getElementById("studentsBox1");
  let getStudentsBox2 = document.getElementById("studentsBox2");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patL1XjEkiezY5YHv.a8da02d6fab652f0daf53682ff1fe929eb5b371852dbce554b0f2f03f9b421a6`,
    },
  };

  await fetch(`https://api.airtable.com/v0/appEvoTvbpggMe3uz/Students`, options) // API Link
    .then((response) => response.json())
    .then((data) => {
      console.log(data.records);

      // Clear any existing content inside the containers
      getStudentsBox1.innerHTML = "";
      getStudentsBox2.innerHTML = "";

      let cardElemBox1 = `<div class="card-container">`;
      let cardElemBox2 = `<div class="card-container">`;

      // Split the data into two halves
      let half = Math.ceil(data.records.length / 2);
      let firstHalf = data.records.slice(0, half);
      let secondHalf = data.records.slice(half);

      firstHalf.forEach((record, index) => {
        let studentName = record.fields["Name"];
        let studentCareer = record.fields["Career"];
        let studentPhoto = record.fields["Headshot"];
        let studentBio = record.fields["Bio"];
        let studentLinkedin = record.fields["LinkedIn"];
        let studentAboutMe = studentName.toLowerCase().split(" ").join("_")
        let studentQuote = record.fields["Quote"];

        // Apply colors dynamically
        const footerColor = colorPalette[index % colorPalette.length];

        cardElemBox1 += `
    <div class="flip-card">
      <div class="flip-card-inner">
        <!-- Front of the Card -->
        <div class="flip-card-front">
          <img 
            src="${studentPhoto[0].url}" 
            alt="profile image"
          >
          <footer style="background-color: ${footerColor};">${studentName}</footer>
        </div>
        <!-- Back of the Card -->
        <div class="flip-card-back">
          <div class="career">
          <p>${studentCareer}</p>
          </div>
          <div class="bio">
            <p>${studentBio}</p>
          </div>
          <div class="quote">
            <a>${studentQuote}</a>
          </div>
          <footer style="background-color: ${footerColor};">
            <a href="./students/${studentAboutMe}" class="social-icon" target="_blank">
              <img src="https://cdn.glitch.global/dc4e1fc5-5add-4d75-8dab-56fa049fe306/monitor-screen-computer-with-colorful-rainbow-bubble-illustration-logo-design-vector.jpg?v=1732148069149">
            </a>
            <a href="${studentLinkedin}" class="social-icon" target="_blank">
              <img src="https://cdn.glitch.global/dc4e1fc5-5add-4d75-8dab-56fa049fe306/LinkedIn_logo_initials.png?v=1732147125031">
            </a>
          </footer>
        </div>
      </div>
    </div>
  `;
      });

      secondHalf.forEach((record, index) => {
        let studentName = record.fields["Name"];
        let studentCareer = record.fields["Career"];
        let studentPhoto = record.fields["Headshot"];
        let studentBio = record.fields["Bio"];
        let studentLinkedin = record.fields["LinkedIn"];
        let studentAboutMe = studentName.toLowerCase().split(" ").join("_")
        let studentQuote = record.fields["Quote"];

        // Apply colors dynamically
        const footerColor = colorPalette[index % colorPalette.length];

        cardElemBox2 += `
    <div class="flip-card">
      <div class="flip-card-inner">
        <!-- Front of the Card -->
        <div class="flip-card-front">
          <img 
            src="${studentPhoto[0].url}" 
            alt="profile image"
          >
          <footer style="background-color: ${footerColor};">${studentName}</footer>
        </div>
        <!-- Back of the Card -->
        <div class="flip-card-back">
        <div class="career">
          <p>${studentCareer}</p>
          </div>
          <div class="bio">
            <p>${studentBio}</p>
          </div>
          <div class="quote">
            <p>${studentQuote}</p>
          </div>
          <footer style="background-color: ${footerColor};">
            <a href="./students/${studentAboutMe}/index.html" class="social-icon" target="_blank">
              <img src="https://cdn.glitch.global/dc4e1fc5-5add-4d75-8dab-56fa049fe306/monitor-screen-computer-with-colorful-rainbow-bubble-illustration-logo-design-vector.jpg?v=1732148069149">
            </a>
            <a href="${studentLinkedin}" class="social-icon" target="_blank">
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
      getStudentsBox1.innerHTML = cardElemBox1;
      getStudentsBox2.innerHTML = cardElemBox2;
    })
    .catch((error) => console.error("Error fetching Airtable data:", error));
}

getAllRecords();
