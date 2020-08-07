const container = document.querySelector('.container');
const newBookBtn = document.querySelector('.new-book-btn');
const bookForm = document.querySelector('.book-form');
let i = 0;
let myLibrary = getLibrary() || [];

if (myLibrary.length > 0) {
	myLibrary.forEach((book, i) => {
		myLibrary.splice(i, 1, new Book(book.title, book.author, book.pages, book.read));
	});
}

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.toggleReadStatus = function () {
	this.read = !this.read;
};

function addBookToLibrary(book) {
	myLibrary.push(book);
	storage();
	container.innerHTML += createBook(book);
}

function render() {
	myLibrary.forEach((book) => {
		container.innerHTML += createBook(book);
	});
}

function createBook(book) {
	i++
	return `<div id="${i}" class="book"">
						<p>${book.title}</p>
						<p>${book.author}</p>
						<p>${book.pages}</p>
						<input type="checkbox" ${book.read ? 'checked' : null} onchange="changeReadStatus(this.parentElement)">
						<span class="remove-btn" onclick="removeBook(this.parentElement)">REMOVE</span>
					</div>`;
}

function removeBook(bookElement) {
	myLibrary.splice(bookElement.id - 1, 1);
	console.log(myLibrary);
	storage();
	container.removeChild(bookElement);
}

function changeReadStatus(bookElement) {
	let book = myLibrary[bookElement.id - 1];
	book.toggleReadStatus();
	myLibrary[bookElement.id - 1] = book;
	storage();
	console.log(book);
}

function storage() {
	localStorage.setItem('library', JSON.stringify(myLibrary));
}

function getLibrary() {
	return JSON.parse(localStorage.getItem('library'));
}

newBookBtn.addEventListener('click', function () {
	bookForm.classList.remove('d-none');
});

document.querySelector('.create-book-btn').addEventListener('click', function () {
	let title = bookForm.children[0].value;
	let author = bookForm.children[1].value;
	let pages = bookForm.children[2].value;
	let read = bookForm.children[3].checked;
	let book = new Book(title, author, pages, read);
	addBookToLibrary(book);
});

render();

console.log(myLibrary);
