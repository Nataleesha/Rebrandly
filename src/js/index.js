import { renderResponse } from "./renderFunctions";

const API_KEY = "dc42d62a4cda439f87bf91bacf04925c";
const URL = "https://api.rebrandly.com/v1/links";

const inputField = document.querySelector("#input");
const shortenButton = document.querySelector("#shorten");
const responseField = document.querySelector("#responseField");

const shortenUrl = async () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({ destination: urlToShorten });
  try {
    const response = await fetch(URL, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json",
        apikey: API_KEY,
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      renderResponse(jsonResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

const displayShortUrl = (event) => {
  event.preventDefault();
  while (responseField.firstChild) {
    responseField.removeChild(responseField.firstChild);
  }
  shortenUrl();
};

shortenButton.addEventListener("click", displayShortUrl);
