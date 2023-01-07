

const BookFunctions = {
    summary() {
        return `${this.title}, by ${this.author}`
    }
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

    delBook: (book) => {
        for(i=0; i<Library.books.length; i++){
            if(book === Library.books[i]){
                Library.books.splice(i, 1);
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
    let author = document.createElement("p");
    author.setAttribute("class", "BookAuthor");
    let pages = document.createElement("p");
    pages.setAttribute("class", "BookPages");
    let read = document.createElement("input");
    pages.setAttribute("type", "checkbox");
    pages.setAttribute("class", "BookRead");
}


let book1 = BookFactory('Book', 'Author', 250, true);
let book2 = BookFactory('Novel', 'Author', 300, false);

console.log(book1.title);
console.log(book2.summary());

Library.addBook(book1);
Library.addBook(book2);
console.log(Library.books);

Library.books.forEach(book => console.log(book.title, book.author));
