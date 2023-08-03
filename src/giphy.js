export default class Giphy {
  static findGifs(searchValue) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchValue}&limit=25&offset=0&lang=en&bundle=messaging_non_clips`;
      request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        console.log(response);
        if (this.status === 200) {
          resolve({response, searchValue});
        } else {
          reject([this, response, searchValue]);
        }
      });

      request.open("GET", url, true);
      request.send();
    })
  }

  static showRandom() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}`
    request.addEventListener("loadend", function () {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve(response);
      } else {
        reject([this, response]);
      } 
    });
    request.open("GET", url, true);
    request.send();
  });
  }
}
