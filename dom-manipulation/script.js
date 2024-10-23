// Array to store quotes
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    category: "Inspiration",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
  {
    text: "Success is not the key to happiness. Happiness is the key to success.",
    category: "Success",
  },
];

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = `"${quote.text}" - Category: ${quote.category}`;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText.trim() === "" || newQuoteCategory.trim() === "") {
    alert("Please fill in both the quote and category fields.");
    return;
  }

  // Add the new quote to the array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Clear the input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("New quote added successfully!");
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Event listener for the "Add Quote" button
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
