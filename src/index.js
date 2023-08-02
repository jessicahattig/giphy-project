import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Giphy from './giphy.js';

// Business Logic

function findGifs(searchValue) {
  let promise = Giphy.findGifs(searchValue);
  promise.then(function (data) {
    const response = data.responseText;
    const searchValue = data.searchValue;
    printElements(response, searchValue);
    findGifs(searchValue);
  }, function (response) {
    printError(this, response, searchValue);
  });
}

//next, showRandom needs to be converted to a static method and use promises.

function showRandom() {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}`
  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    console.log(response);
    if (this.status === 200) {
      printRandom(response);
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

function printRandom(apiResponse) {
  const gifImageURL = apiResponse.data.images.downsized.url;
  const gifImage = `<img src="${gifImageURL}" alt="Random GIF">`;
  document.getElementById("showResponse").innerHTML = gifImage;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const searchValue = document.querySelector('#gif-search').value;
  document.querySelector('#gif-search').value = null;
  findGifs(searchValue);
}



window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
  document.getElementById('random-btn').addEventListener("click", showRandom);
});
