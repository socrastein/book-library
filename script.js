const newBook = document.getElementById("newBook");
const addBookButton = document.getElementById("addBookButton");
const BookDisplay = document.getElementById("BookDisplay");

const formContainer = document.getElementById("formContainer");
const newTitle = document.getElementById("title");
const newAuthor = document.getElementById("author");
const newPages = document.getElementById("pages");
const newRead = document.getElementById("read");

newBook.addEventListener('click', showForm);

addBookButton.addEventListener('click', () => {
    var newBook = undefined;
    newBook = BookFactory(
        newTitle.value, 
        newAuthor.value, 
        newPages.value,
        newRead.checked);
    Library.addBook(newBook);
    CardFactory(newBook);
    hideForm();
})

const BookFunctions = {
    summary() {
        return `${this.title}, by ${this.author}`
    },
}

const BookFactory = (title, author, pages, read) => {
    // BookFunctions is kept as a separate prototype object
    // so each object shares the methods instead of having separate copies
    let object = Object.create(BookFunctions);

    object.title    = title;
    object.author   = author;
    object.pages    = pages;
    object.read     = read;

    return object;
}

const Library = {
    books: [],

    addBook: (book) => Library.books.push(book),

    removeBook: (book) => {
        for(i=0; i<Library.books.length; i++){
            if(book === Library.books[i]){
                Library.books.splice(i, 1);
                console.log('Removed ' + book.summary() + ' from library')
            }
        }
    }
}

// Interacts with the DOM to create new div (card) elements that display
// on the page
const CardFactory = (book) => {

    const displayArea = document.getElementById("BookDisplay");
    const card = document.createElement("div");
    card.setAttribute("class", "BookCard");

    const title = document.createElement("p");
    title.setAttribute("class", "BookTitle");
    title.innerHTML = book.title;

    const author = document.createElement("p");
    author.setAttribute("class", "BookAuthor");
    author.innerHTML = book.author;

    const pages = document.createElement("p");
    pages.setAttribute("class", "BookPages");
    if(book.pages){
        pages.innerHTML = book.pages + " pages"
    } else pages.innerHTML = '';

    // Read label and checkbox placed into a div so that
    // they can be displayed on the same grid row
    const readDiv = document.createElement("div");
    const read = document.createElement("input");
    const readLabel = document.createElement("label");
    readLabel.innerHTML = "Read: ";
    read.setAttribute("type", "checkbox");
    read.setAttribute("class", "BookRead");
    if(book.read){read.setAttribute("checked", '');}
    readDiv.appendChild(readLabel);
    readDiv.appendChild(read);

    const remove = document.createElement("img");
    remove.setAttribute("src", "close.svg");
    remove.addEventListener("click", () => {removeCard(card)});
    
    cardElements = [title, author, pages, readDiv, remove];
    cardElements.forEach(element => card.appendChild(element));
    displayArea.appendChild(card);
}

function showForm() {
    formContainer.style.setProperty("display", "inline");
    newBook.style.setProperty("display", "none");
    BookDisplay.style.setProperty("display", "none");
    formContainer.focus();
}

function hideForm() {
    formContainer.style.setProperty("display", "none");
    newBook.style.setProperty("display", "inline");
    BookDisplay.style.setProperty("display", "flex");

    newTitle.value = '';
    newAuthor.value = '';
    newPages.value = '';
    newRead.value = false;
    newRead.checked = false;
}

function removeCard(card) {
    card.remove();
}

let CI = BookFactory('Consciousness Explained', 'Daniel Dennett', 450, true);
Library.addBook(CI);
CardFactory(CI);
