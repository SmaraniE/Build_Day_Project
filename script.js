let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

const quoteInput = document.getElementById("quoteInput");
const addBtn = document.getElementById("addBtn");
const quoteList = document.getElementById("List");

function Quotes() {
    quoteList.innerHTML = "";

    quotes.forEach(function (quote, index) {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="quote-text">${quote}</span>
            <div class="btn-group">
                <button class="delete-btn" onclick="deleteQuote(${index})">Delete</button>
                <button class="edit-btn" onclick="editQuote(${index}, this)">Edit</button>
            </div>
        `;

        quoteList.appendChild(li);
    });
}

function addQuote() {
    const newQuote = quoteInput.value.trim();
    if (newQuote === "") return;

    quotes.push(newQuote);
    saveQuotes();
    quoteInput.value = "";
    Quotes();
}

function deleteQuote(index) {
    quotes.splice(index, 1);
    saveQuotes();
    Quotes();
}

function editQuote(index, btn) {
    const li = btn.closest("li");
    const textSpan = li.querySelector(".quote-text");

    const original = textSpan.textContent;

    textSpan.innerHTML = `<input type="text" value="${original}" class="edit-input">`;

    const btnGroup = li.querySelector(".btn-group");
    btnGroup.innerHTML = `
        <button class="edit-btn" onclick="saveEdit(${index}, this)">Save</button>
        <button class="delete-btn" onclick="cancelEdit(${index}, '${original}', this)">Cancel</button>
    `;
}

function saveEdit(index, btn) {
    const li = btn.closest("li");
    const newValue = li.querySelector(".edit-input").value;

    quotes[index] = newValue;
    saveQuotes();
    Quotes();
}

function cancelEdit(index, original, btn) {
    Quotes(); // simply re-render to reset UI
}

function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

addBtn.addEventListener("click", addQuote);

Quotes();
