import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function findGifs(searchValue) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchValue}&limit=25&offset=0&lang=en&bundle=messaging_non_clips`;
  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    console.log(response);
    if (this.status === 200) {
      printElements(response);
    } else {
      printError(this, response);
    }
  });

  request.open("GET", url, true);
  request.send();
}


// UI Logic

function printError(request, apiResponse, searchValue) {
  document.querySelector('#showResponse').innerText = `There was an error searching for ${searchValue}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse) {
  const gifImage = apiResponse.data.map((gifData) => {
    const gifImageURL = gifData.images.original.url;
    return `<img src="${gifImageURL}" alt="GIF">`
  });
  document.getElementById("showResponse").innerHTML = gifImage;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const searchValue = document.querySelector('#gif-search').value;
  document.querySelector('#gif-search').value = null;
  findGifs(searchValue);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
