const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

function getRandomQuotes(max) {
  return Math.floor(Math.random() * max) + 1;
}

async function getQuotes() {
  let quotes;

  if (switchLang.classList.contains("switch-off")) {
    quotes = "quotes_en.json";
  } else {
    quotes = "quotes.json";
  }
  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuotes = getRandomQuotes(data.length) - 1;
  quote.textContent = '"' + data[randomQuotes].text + '"';
  author.textContent = data[randomQuotes].author;
}

changeQuote.onclick = () => {
  getQuotes();
};
window.onload = () => {
  getQuotes();
};
