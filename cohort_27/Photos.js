// BACKEND FUNCTIONS
const options = {
      headers: {
        'Authorization': 'Bearer patZba5jQAk4uVV8K.b1f1194c8a99a5dbb46c9650019dbd3b5e802926efb070296bb1b68f1ce0529b'
      }};

let PicturesDataArray = [];

// 2. async function to grab the GeneralPics table from airtable and then put it in pictureDirectory
async function getPictureDirectory () {
  // remember to use await and fetch (ex of fetch in line 6)
    try {
    const response = await fetch('https://api.airtable.com/v0/appcCE7cmHVWkV8ob/GeneralPics', options);
    const data = await response.json();
    //console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error fetching general pictures directory:', error);
  }
}

async function SetPicturesData() {
  const data = await getPictureDirectory();

  for (const pictureData of data.records) {
    PicturesDataArray.push(pictureData.fields);
  }
  
  const galleryRef = document.getElementById("gallery");
  galleryRef.innerHTML = ""; // clear the html of galleryRef
  
  for (const pictureData of PicturesDataArray) {
    const imgRef = pictureData.Image[0].url;
    const imgAlt = pictureData.ImgName;
    galleryRef.innerHTML += `
        <a href="${imgRef}" target="_blank"><img class="thumbs" src="${imgRef}" alt="${imgAlt}"></a>
    `;
  }
}

SetPicturesData();
console.log(PicturesDataArray);

