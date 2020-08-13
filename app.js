const container = document.querySelector('.container');
const newBookBtn = document.querySelector('.new-book-btn');
const createBookBtn = document.querySelector('.create-book-btn');
const modal = document.querySelector('.modal');
const title = document.querySelector('.book-title');
const author = document.querySelector('.book-author');
const pages = document.querySelector('.book-pages');
const read = document.querySelector('.book-read');
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () { // eslint-disable-line func-names
  this.read = !this.read;
};

function getLibrary() {
  const library = JSON.parse(localStorage.getItem('library')) || [];

  library.forEach((book, i) => {
    library.splice(i, 1, new Book(book.title, book.author, book.pages, book.read));
  });

  return library;
}

function storeLibrary() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function validateForm() {
  const errors = [];

  if (pages.value === '' || pages.value < 0) {
    errors.push(pages);
  }
  if (title.value === '') {
    errors.push(title);
  }
  if (author.value === '') {
    errors.push(author);
  }

  if (errors.length === 0) {
    return true;
  }
  return errors;
}

function cleanFormFields() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

function createBook(book, id) {
  return `<div id="${id}" class="book"">
  <div>
  <span>Title: </span>
  <p>${book.title}</p>
  </div>
  <div>
  <span>Author: </span>
  <p>${book.author}</p>
  </div>
  <div>
  <span>Pages: </span>
  <p>${book.pages}</p>
  </div>
  <div class="read">
    <span>read status:</span>
    <input type="checkbox" ${book.read ? 'checked' : ''} onchange="changeReadStatus(this.parentElement)">
  </div>
  <span class="remove-btn" onclick="removeBook(this.parentElement)">REMOVE</span>
</div>`;
}

function render() {
  let id = 0;
  container.innerHTML = '';

  myLibrary.forEach((book, i) => {
    id = i;
    container.innerHTML += createBook(book, id);
  });
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  storeLibrary();
  render();
}

function newBook() {
  const valid = validateForm();

  if (valid === true) {
    const titleValue = title.value;
    const authorValue = author.value;
    const pagesValue = pages.value;
    const readValue = read.checked;
    const book = new Book(titleValue, authorValue, pagesValue, readValue);
    addBookToLibrary(book);
    cleanFormFields();
    modal.classList.remove('open');
  } else {
    valid.forEach((error) => {
      const errorDescription = `<p class="form-error">There is an error in ${error.name}</p>`;
      error.insertAdjacentHTML('afterend', errorDescription);
    });
  }
}

function removeBook(bookElement) { // eslint-disable-line no-unused-vars
  myLibrary.splice(bookElement.id, 1);
  container.removeChild(bookElement);
  storeLibrary();
  render();
}

function changeReadStatus(bookElement) { // eslint-disable-line no-unused-vars
  const book = myLibrary[bookElement.parentElement.id];
  book.toggleReadStatus();
  storeLibrary();
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

window.onload = () => {
  myLibrary = getLibrary();
  render();
  addEventsListeners();
};
