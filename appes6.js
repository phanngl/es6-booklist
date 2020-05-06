class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {

  addBookToList(book) {
    const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');
    row.innerHTML =
      `<td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>`

    list.appendChild(row);
  }

  showAlert(msg, className) {
    // create div
    const div = document.createElement('div');

    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(msg));
    // get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();
      ui.addBookToList(book);
    })
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {

    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        console.log('found');
        books.splice(index, 1);
      }
    });
    
    localStorage.setItem('books', JSON.stringify(books));
  }


}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();
  // get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // instantiating new book
  const book = new Book(title, author, isbn);

  // instantiate UI
  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    ui.addBookToList(book);
    // add book to LS
    Store.addBook(book);

    ui.showAlert('Book added!', 'success');

    //clear field
    ui.clearFields();
  }

});

// event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  e.preventDefault();
  const ui = new UI();
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.deleteBook(e.target);
  ui.showAlert('Book has been deleted', 'success');
})