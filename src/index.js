import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function findGifs(searchValue) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchValue}&limit=25&offset=0&lang=en&bundle=messaging_non_clips`
  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    console.log(response);
    if (this.status === 200) {
      printElements(response)
    } else {
      printError(this, response)
    }
  });

  request.open("GET", url, true);
  request.send();
}


// UI Logic

function printElements(apiResponse) {
  document.getElementById
}

