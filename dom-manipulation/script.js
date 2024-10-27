document.addEventListener("DOMContentLoaded", function () {
  // Array to store quote objects (text and category)
  let quotes = [
    {
      text: "Life is what happens when you're busy making other plans.",
      category: "Life",
    },
    { text: "Do or do not, there is no try.", category: "Motivation" },
    {
      text: "The only way to do great work is to love what you do.",
      category: "Work",
    },
  ];

  // Load quotes from local storage on page load
  function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem("quotes"));
    if (storedQuotes && storedQuotes.length > 0) {
      quotes = storedQuotes;
    }
  }

  // Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  loadQuotes();

  // DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");

  // Function to show a random quote and save it in session storage
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><small>Category: ${randomQuote.category}</small>`;

    // Save last viewed quote in session storage
    sessionStorage.setItem("lastQuote", randomQuote.text);
  }

  // Load the last viewed quote from session storage on page load
  function loadLastViewedQuote() {
    const lastQuote = sessionStorage.getItem("lastQuote");
    if (lastQuote) {
      quoteDisplay.innerHTML = `<p>${lastQuote}</p>`;
    }
  }

  loadLastViewedQuote();

  // Function to add a new quote
  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document
      .getElementById("newQuoteCategory")
      .value.trim();

    if (quoteText === "" || quoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }

    // Add the new quote to the array
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);

    // Save to local storage
    saveQuotes();

    // Clear the input fields after adding
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Display a success message
    quoteDisplay.innerHTML = `<p>New quote added successfully: <br> "${newQuote.text}"</p><small>Category: ${newQuote.category}</small>`;
  }

  // Event listener for the "Show New Quote" button
  newQuoteButton.addEventListener("click", showRandomQuote);

  // Export quotes as a JSON file
  function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a temporary download link and click it
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "quotes.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  // Button to trigger export
  const exportButton = document.createElement("button");
  exportButton.textContent = "Export Quotes";
  exportButton.addEventListener("click", exportQuotes);
  document.body.appendChild(exportButton);

  // Import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          alert("Quotes imported successfully!");
        } else {
          alert("Invalid JSON format");
        }
      } catch (error) {
        alert("Error reading the file");
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }

  // Create the file input for importing quotes
  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = ".json";
  importInput.addEventListener("change", importFromJsonFile);
  document.body.appendChild(importInput);

  // Call the function to create the form when the page loads
  createAddQuoteForm();

  // Populate categories and apply selected category filter
  populateCategories();
  filterQuotes();
});
