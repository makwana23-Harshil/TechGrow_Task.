let likeCount = 0;
const likedQuotes = []; // Array to store liked quotes

// Generate Quotes
function generateQuotes() {
    const quoteDiv = document.getElementById("quote");
    const generateButton = document.getElementById("generate");

    // Show loading text
    quoteDiv.innerText = "Loading a new quote...";
    generateButton.disabled = true;

    // Fetch the quote
    fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-key": "VyHn9xQ3LjFLmQBt5GqpOg==kkhGJuclz2EKwmXr" }
    })
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch quote");
            return response.json();
        })
        .then(data => {
            if (data[0]?.quote) {
                quoteDiv.innerHTML = `“${data[0].quote}” <br> <span>— ${data[0].author || "Unknown"}</span>`;
            } else {
                quoteDiv.innerText = "No quote available!";
            }
        })
        .catch(error => {
            console.error("Error fetching the quote:", error);
            quoteDiv.innerText = "Failed to load quote.Check your internet connection.Please try again.";
        })
        .finally(() => {
            generateButton.disabled = false;
        });
}

// Like Functionality
document.getElementById("likeIcon").addEventListener("click", () => {
    const currentQuote = document.getElementById("quote").innerText;

    if (!likedQuotes.includes(currentQuote)) {
        likeCount++;
        likedQuotes.push(currentQuote);

        // Update like count
        document.getElementById("likeCount").innerText = `Likes: ${likeCount}`;
    } else {
        alert("This quote is already liked!");
    }
});

// View Liked Quotes Functionality
document.getElementById("viewLikedQuotes").addEventListener("click", () => {
    const likedQuotesSection = document.getElementById("likedQuotesSection");
    const likedQuotesList = document.getElementById("likedQuotesList");

    // Clear the current list
    likedQuotesList.innerHTML = "";

    // Populate the list with liked quotes
    likedQuotes.forEach(quote => {
        const listItem = document.createElement("li");
        listItem.innerText = quote;
        likedQuotesList.appendChild(listItem);
    });

    // Toggle visibility of the liked quotes section
    if (likedQuotesSection.style.display === "none") {
        likedQuotesSection.style.display = "block";
    } else {
        likedQuotesSection.style.display = "none";
    }
});

// Share Functionality
document.getElementById("shareIcon").addEventListener("click", () => {
    const quoteText = document.getElementById("quote").innerText;
    if (navigator.share) {
        navigator.share({
            title: "Quote",
            text: quoteText,
        }).then(() => {
            alert("Quote shared successfully!");
        }).catch((error) => {
            console.log("Sharing failed", error);
        });
    } else {
        alert("Your browser does not support the Web Share API.");
    }
});

// Copy Functionality
document.getElementById("copyIcon").addEventListener("click", () => {
    const quoteText = document.getElementById("quote").innerText;
    navigator.clipboard.writeText(quoteText).then(() => {
        alert("Quote copied to clipboard!");
    }).catch((error) => {
        console.error("Copy failed", error);
    });
});


// Close Liked Quotes Section Functionality
document.getElementById("closeLikedQuotes").addEventListener("click", () => {
    const likedQuotesSection = document.getElementById("likedQuotesSection");
    likedQuotesSection.style.display = "none";
});