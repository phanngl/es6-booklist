function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// ui constructor
function UI() {

}

UI.prototype.addBookToList = function (book) {
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

UI.prototype.clearField = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

UI.prototype.showAlert = function (msg, className) {  
  // create div
  const div = document.createElement('div');

  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(msg));
  // get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  container.insertBefore(div, form);

  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

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

    ui.showAlert('Book added!', 'success');

    //clear field
    ui.clearField();
  }

});

// event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  e.preventDefault();
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book has been deleted', 'success');
})