const container = document.querySelector('.container');
const newBookBtn = document.querySelector('.new-book-btn');
const bookForm = document.querySelector('.book-form');
let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(book) {
	myLibrary.push(book);

	container.innerHTML += `<div id="${myLibrary.length}" class="book">
														<p>${book.title}</p>
														<p>${book.author}</p>
														<p>${book.pages}</p>
														<p>${book.read}</p>
														<span class="remove-btn" onclick="removeBook(this)">REMOVE</span>
													</div>`;
}

function render() {
	myLibrary.forEach((book) => {
		container.innerHTML += `<div id="${myLibrary.length}" class="book"">
    												  <p>${book.title}</p>
    												  <p>${book.author}</p>
    												  <p>${book.pages}</p>
															<p>${book.read}</p>
															<span class="remove-btn" onclick="removeBook(this)">REMOVE</span>
														</div>`;
	});
}

function removeBook(btn) {
	let bookToRemove = btn.parentElement;
	myLibrary.splice(bookToRemove.id, 1);
	container.removeChild(bookToRemove);
}

newBookBtn.addEventListener('click', function () {
	bookForm.classList.remove('d-none');
});

document.querySelector('.create-book-btn').addEventListener('click', function () {
	let book = {
		title: bookForm.children[0].value,
		author: bookForm.children[1].value,
		pages: bookForm.children[2].value,
		read: bookForm.children[3].value,
	};
	addBookToLibrary(book);
});

render();
