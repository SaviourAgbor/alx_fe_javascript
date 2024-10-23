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

// Function to display a random quote
function displayRandomQuote() {
  // Select a random quote from the array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Update the quoteDisplay div with the random quote using innerHTML
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `<p>"${quote.text}" - <strong>Category:</strong> ${quote.category}</p>`;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  // Check if the input fields are not empty
  if (newQuoteText.trim() === "" || newQuoteCategory.trim() === "") {
    alert("Please fill in both the quote and category fields.");
    return;
  }

  // Add the new quote to the quotes array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Clear the input fields after adding
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("New quote added successfully!");

  // Optionally, display the newly added quote right away
  displayRandomQuote();
}

// Event listener for the "Show New Quote" button
document
  .getElementById("newQuote")
  .addEventListener("click", displayRandomQuote);

// Event listener for the "Add Quote" button
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
