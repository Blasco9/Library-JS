const container = document.querySelector('.container');
const newBookBtn = document.querySelector('.new-book-btn');
const bookForm = document.querySelector('.book-form');
let myLibrary = getLibrary() || [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.toggleReadStatus = function() {
	this.read = !this.read;
}

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
	return `<div id="${myLibrary.length}" class="book"">
						<p>${book.title}</p>
						<p>${book.author}</p>
						<p>${book.pages}</p>
						<input type="checkbox" onchange="changeReadStatus(this.parentElement)">
						<span class="remove-btn" onclick="removeBook(this.parentElement)">REMOVE</span>
					</div>`
}

function removeBook(bookElement) {
	myLibrary.splice(bookElement.id, 1);
	container.removeChild(bookElement);
}

function changeReadStatus(bookElement) {
	let book = myLibrary[bookElement.id - 1]
	book.toggleReadStatus()
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
	let title = bookForm.children[0].value
	let author = bookForm.children[1].value
	let pages = bookForm.children[2].value
	let read = bookForm.children[3].value
	let book = new Book(title, author, pages, read)
	addBookToLibrary(book);
});

render();
getLibrary();
console.log(getLibrary());
