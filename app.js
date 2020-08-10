const container = document.querySelector('.container');
const newBookBtn = document.querySelector('.new-book-btn');
const bookForm = document.querySelector('.book-form');
const createBookBtn = document.querySelector('.create-book-btn');
const modal = document.querySelector('.modal');
let myLibrary = getLibrary();

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
	let title = bookForm.children[0].value;
	let author = bookForm.children[1].value;
	let pages = bookForm.children[2].value;
	let read = bookForm.children[3].checked;
	let book = new Book(title, author, pages, read);
	addBookToLibrary(book);
}

function createBook(book, id) {
	return `<div id="${id}" class="book"">
						<p>${book.title}</p>
						<p>${book.author}</p>
						<p>${book.pages}</p>
						<input type="checkbox" ${book.read ? 'checked' : ''} onchange="changeReadStatus(this.parentElement)">
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
	let book = myLibrary[bookElement.id];
	book.toggleReadStatus();
	storeLibrary();
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
	let library = JSON.parse(localStorage.getItem('library')) || [];

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
		if(e.target.classList.contains('modal')) {
			modal.classList.remove('open')
		}
	});
}

render();
addEventsListeners();
