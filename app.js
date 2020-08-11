const container = document.querySelector('.container');
const newBookBtn = document.querySelector('.new-book-btn');
const createBookBtn = document.querySelector('.create-book-btn');
const modal = document.querySelector('.modal');
const title = document.querySelector('.book-title');
const author = document.querySelector('.book-author');
const pages = document.querySelector('.book-pages');
const read = document.querySelector('.book-read');
const myLibrary = getLibrary();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function newBook() {
  const titleValue = title.value;
  const authorValue = author.value;
  const pagesValue = pages.value;
  const readValue = read.checked;
  const book = new Book(titleValue, authorValue, pagesValue, readValue);
  addBookToLibrary(book);
  cleanFormFields();
  modal.classList.remove('open');
}

function createBook(book, id) {
  return `<div id="${id}" class="book"">
  <p>${book.title}</p>
  <p>${book.author}</p>
  <p>${book.pages}</p>
  <div class="read">
    <span>read status:</span>
    <input type="checkbox" ${book.read ? 'checked' : ''} onchange="changeReadStatus(this.parentElement)">
  </div>
  <span class="remove-btn" onclick="removeBook(this.parentElement)">REMOVE</span>
</div>`;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  storeLibrary();
  render();
}

function removeBook(bookElement) {
  myLibrary.splice(bookElement.id, 1);
  container.removeChild(bookElement);
  storeLibrary();
  render();
}

function changeReadStatus(bookElement) {
  const book = myLibrary[bookElement.parentElement.id];
  book.toggleReadStatus();
  storeLibrary();
}

function cleanFormFields() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

function render() {
  let id = 0;
  container.innerHTML = '';

  myLibrary.forEach((book, i) => {
    id = i;
    container.innerHTML += createBook(book, id);
  });
}

function storeLibrary() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function getLibrary() {
  const library = JSON.parse(localStorage.getItem('library')) || [];

  library.forEach((book, i) => {
    library.splice(i, 1, new Book(book.title, book.author, book.pages, book.read));
  });

  return library;
}

function addEventsListeners() {
  newBookBtn.addEventListener('click', () => {
    modal.classList.add('open');
  });
  createBookBtn.addEventListener('click', newBook);
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      modal.classList.remove('open');
    }
  });
}

render();
addEventsListeners();
