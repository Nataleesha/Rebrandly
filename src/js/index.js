import {
  renderResponse,
  renderRawResponse,
  renderJsonResponse,
} from "./renderFunctions";

const API_KEY = "dc42d62a4cda439f87bf91bacf04925c";
const URL = "https://api.rebrandly.com/v1/links";

const inputField = document.querySelector("#input");
const shortenButton = document.querySelector("#shorten");
const responseField = document.querySelector("#responseField");

const shortenUrl = () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({ destination: urlToShorten });

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      apikey: API_KEY,
    },
    body: data,
  })
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request failed!");
      },
      (networkError) => {
        console.log(networkError.message);
      }
    )
    .then((jsonResponse) => {
      renderResponse(jsonResponse);
    });
};

const displayShortUrl = (event) => {
  event.preventDefault();
  while (responseField.firstChild) {
    responseField.removeChild(responseField.firstChild);
  }
  shortenUrl();
};

shortenButton.addEventListener("click", displayShortUrl);
