let quoteContent = document.querySelector(".quote-content > p");
let quoteAuthor = document.querySelector(".quote-author");
let quoteTags = document.querySelector(".quote-tags");

fetch(
    "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json"
)
    .then((response) => response.json())
    .then((data) => {
        const quotes = data;

        function displayRandomQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];

            quoteContent.textContent = "\"" + randomQuote.quote + "\"";
            quoteAuthor.textContent = randomQuote.author;
            quoteTags.innerHTML = "";

            randomQuote.tags.forEach((tagContent) => {
                const tag = document.createElement("span");
                tag.classList.add("quote-tag");
                tag.textContent = tagContent.charAt(0).toUpperCase() + tagContent.slice(1);
                quoteTags.appendChild(tag);
            })
        }

        displayRandomQuote();


        function copyTextToClipboard(text) {
            text = text.slice(1, -1);

            navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Copied to clipboard:', text);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
            });
        }


        document
            .getElementById("randomButton")
            .addEventListener("click", displayRandomQuote);

        document.getElementById("copyButton").addEventListener("click", () => {
            copyTextToClipboard(quoteContent.textContent);
        });
    })
    .catch((error) => {
        console.error("Error fetching quotes:", error);
    });
