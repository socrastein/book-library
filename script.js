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

    let title = document.createElement("p");
    title.setAttribute("class", "BookTitle");
    title.innerHTML = book.title;

    let author = document.createElement("p");
    author.setAttribute("class", "BookAuthor");
    author.innerHTML = book.author;

    let pages = document.createElement("p");
    pages.setAttribute("class", "BookPages");
    pages.innerHTML = book.pages + " pages"

    let read = document.createElement("input");
    let readLabel = document.createElement("label");
    readLabel.innerHTML = "Read: ";
    read.setAttribute("type", "checkbox");
    read.setAttribute("class", "BookRead");

    let cardElements = [title, author, pages, readLabel, read];
    cardElements.forEach(element => card.appendChild(element));
    displayArea.appendChild(card);
}


let book1 = BookFactory('Book One', 'Author One', 250, true);
let book2 = BookFactory('Book Two', 'Author Two', 300, false);


Library.addBook(book1);
Library.addBook(book2);

Library.books.forEach(book => CardFactory(book));
