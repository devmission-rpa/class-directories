const airtableApiKey =
  "patd5cabkqjYsY5GR.ff1a4823540549bab2edf77f4e0f2cb43daa5e3f16e8fadf02e5bcc5ef1db7be"; // replace with your key
const baseId = "app8YaZAqWQdgtElA";
const tableName = "cohort30";
const tableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}?&view=order`;

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("card-container")) {
    loadStudentCards();
  }
});

async function fetchStudents() {
  const response = await fetch(tableUrl, {
    headers: {
      Authorization: `Bearer ${airtableApiKey}`,
    },
  });
  const data = await response.json();
  return data.records;
}

async function loadStudentCards() {
  const container = document.getElementById("card-container");
  const students = await fetchStudents();

  students.forEach((student) => {
    const fields = student.fields;

    const col = document.createElement("div");
    col.className = "col-lg-4 col-sm-6 mb-4 d-flex justify-content-center";

    col.innerHTML = `
      <div class="card-container">
        <div class="flip-card-inner">
          <!-- Front -->
          <div class="flip-card-front">
            <img src="${fields.Heads[0].url}" alt="${
      fields.Name
    }" class="card-img-top rounded-bottom">
            <div class="card-body text-center">
              <h5 class="card-title">${fields.Name}</h5>
            </div>
          </div>

          <!-- Back -->
          <div
  class="flip-card-back d-flex flex-column justify-content-between p-3 text-center"
>
  <div class="flip-card-back-content">
    <p class="card-text card-name">${fields.Bio || "No bio available."}</p>
    <p class="card-text career">
      Dream Job: ${fields.Career || "No career listed."}
    </p>
    <div class="card-links">
      <a
        href="${fields.LinkedIn}"
        target="_blank"
        class="card-buttons btn btn-linkedin mb-2"
      >
        LinkedIn <i class="fab fa-linkedin"></i>
      </a>

      <a
        href="${fields.AboutMe}"
        target="_blank"
        class="card-buttons btn btn-secondary"
        >About ${fields.First}</a
      >
    </div>
    <p>${fields.Name}</p>
  </div>
</div>
    `;

    container.appendChild(col);
  });
}
const toggleButton = document.getElementById("darkModeToggle");
const body = document.body;

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    toggleButton.classList.remove("btn-outline-dark");
    toggleButton.classList.add("btn-outline-light");
  } else {
    toggleButton.classList.remove("btn-outline-light");
    toggleButton.classList.add("btn-outline-dark");
  }
});
