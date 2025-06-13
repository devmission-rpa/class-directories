"use strict";

const apiURL = `https://api.airtable.com/v0/apphCcHCTAhhlCnHZ/DevMissionDirectory?&view=order`;

//const airtable_token = "patBb7L3JwoRoYwZ9.4fcc03f8818588e17c3f8967864329bb001a0d3aef5285be37903503572ca906"

const options = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer patBb7L3JwoRoYwZ9.4fcc03f8818588e17c3f8967864329bb001a0d3aef5285be37903503572ca906",
  },
};

// token fetch method^

fetch(apiURL, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let newHtml = "";

    for (let i = data.records.length - 1; i >= 0; i--) {
      newHtml += `
        <div class="thumbnail"> 
          
          <div class="imageContainer">
            <a href="./cohort_${data.records[i].fields.CohortName}/index.html" target="_"><img class="thumbnail_img" src="${data.records[i].fields.CohortImage[0].url}" alt="${data.records[0].fields.Name}"></a>
          </div>
          <div class="name">
            <h5 style="color:black; font-family: 'Poppins', sans-serif;"> Cohort # ${data.records[i].fields.CohortName}</h5>
            <p style="color:gray; ">${data.records[i].fields.CohortDate}</p>
          </div>
        </div>`;
    }

    let cohorts = document.getElementById("cohorts");
    cohorts.innerHTML = newHtml;
  });

const summary2 = "fields%5B%5D=TopImage&fields%5B%5D=Name";
const apiURL2 = `https://api.airtable.com/v0/apphCcHCTAhhlCnHZ/DirectoryTopBar?&${summary2}&view=topOrder`;

fetch(apiURL2, options)
  .then((response) => response.json())
  .then((data) => {
    let carouselFirst = document.getElementById("first-image");
  
    let carouselHTML = document.getElementById("carousel");
  
     carouselFirst.innerHTML = `

        
          <img src="${data.records[0].fields.TopImage[0].url}" class="d-block w-100 carousel-img" alt="${data.records[0].fields.Name}" />
          <div class="carousel-caption d-none d-md-block" style="margin-bottom:-3%;">
           <h2 class="caption first">${data.records[0].fields.Name}</h2>
          </div>
        


`
        

    carouselFirst.innerHTML = `
  
      <img src="${data.records[0].fields.TopImage[0].url}" class="d-block w-100 " alt="${data.records[0].fields.Name}">
      <div class="carousel-caption d-none d-md-block" style="margin-bottom:-3%;>
            <h2 class="caption">${data.records[0].fields.Name}</h2>
      </div>
  `;
  
  
  
  

    for (let i = 1; i < data.records.length; i++) {
      carouselHTML.innerHTML += ` 
      
        <div class="carousel-item cropped" data-bs-interval="4000">
          <img src="${data.records[i].fields.TopImage[0].url}" class="d-block w-100 carousel-img" alt="${data.records[i].fields.Name}" />
           <div class="carousel-caption d-none d-md-block style="margin-bottom:-3%;">
            <h2 class="caption">${data.records[i].fields.Name}</h2>
           </div>
        </div>
      
      `;
    }
  
    
  });
