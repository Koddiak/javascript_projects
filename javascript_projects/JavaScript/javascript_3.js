function displayType(book) {
    var bookType = book.getAttribute("data-book-type");
    alert(bookType + " is in the " + book.innerHTML + " genre!");
}