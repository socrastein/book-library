const BookFunctions = {
    displayBook() {
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
}




let book1 = BookFactory('Book', 'Author', 250, true);
let book2 = BookFactory('Novel', 'Author', 300, false);

console.log(book1.title);
console.log(book2.displayBook());
console.log(book1.displayBook === book2.displayBook)

Library.addBook(book1);
Library.addBook(book2);
console.log(Library.books);

Library.books.forEach(book => console.log(book.title, book.author));

BookDisplay.displayAll(Library.books);