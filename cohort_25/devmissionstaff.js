"use strict";

const options = {
  method: "GET",
  headers: {
    Authorization: "Bearer pathZE9Sa3GCx1is1.affc74e5e9dd75a10be7d4de04bf755e81c6ff614e5746b4b828bbc96cd3812b",
  },
};

fetch("https://api.airtable.com/v0/appYBYqd9KS9OqEE5/Team/?&view=Team", options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const cardsContainer = document.getElementById('cards-container');
    data.records.forEach(record => {
      const picture = record.fields["Picture"];
      const name = record.fields["Name"];
      const thumbnail = record.fields["Picture"] ? record.fields["Picture"][0].url : "";
      const role = record.fields["Role"];
      

      const card = document.createElement('div');
      card.classList.add('card', 'col-md-4');

      const front = document.createElement('div');
      front.classList.add('front');
      front.innerHTML = `<img src="${thumbnail}" alt="${name}" style="width: 100%;"><h2>${name}</h2><h6 class="roletitle">${role}</h6>`;
      
  
      
      card.appendChild(front);
      cardsContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
