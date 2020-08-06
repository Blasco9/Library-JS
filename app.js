const container = document.querySelector('.container');
const col = document.querySelector('.col');
const bookForm = document.querySelector('.book-form');
let autoIncrementId = 0;
let myLibrary = [
	{
		title: 'first',
		author: '2',
		pages: '3',
		read: '4',
	},
	{
		title: 'second',
		author: '2',
		pages: '3',
		read: '4',
	},
	{
		title: 'third',
		author: '2',
		pages: '3',
		read: '4',
	},
];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(book) {
	myLibrary.push(book);
	let bookElement = createBook(book)
	container.appendChild(bookElement)

	bookElement.lastChild.addEventListener('click', function (e) {
		let book = e.target.parentElement;

		myLibrary.splice(book.id, 1);
		container.removeChild(book);
	});
}

function render() {
	myLibrary.forEach((book) => {
		container.innerHTML += `<div class="book" id="${autoIncrementId}">
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.pages}</p>
			<p>${book.read}</p>
			<span class="remove-btn">REMOVE</span>
		</div>`;
		autoIncrementId++;
	});
}

render();

const books = document.querySelectorAll('.book');

function addEventListeners() {
	Array.from(books).forEach((book) => {
		book.addEventListener('click', function (e) {});
	});
}

addEventListeners();

col.addEventListener('click', function () {
	bookForm.classList.remove('d-none');
});

const removeBtns = document.querySelectorAll('.remove-btn');

Array.from(removeBtns).forEach((btn) => {
	btn.addEventListener('click', function (e) {
		let book = e.target.parentElement;

		myLibrary.splice(book.id, 1);
		container.removeChild(book);
	});
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

function createBook(book) {
	let bookDiv = document.createElement('div')
	let title = document.createElement('p')
	title.innerText = book.title
	let author = document.createElement('p')
	author.innerText = book.author
	let pages = document.createElement('p')
	pages.innerText = book.pages
	let read = document.createElement('p')
	read.innerText = book.read
	let removeBtn = document.createElement('span')
	removeBtn.innerText = "REMOVE"
	removeBtn.className = 'remove-btn'
	bookDiv.appendChild(title)
	bookDiv.appendChild(author)
	bookDiv.appendChild(pages)
	bookDiv.appendChild(read)
	bookDiv.appendChild(removeBtn)
	bookDiv.classList.add('book')
	bookDiv.id = autoIncrementId++

	return bookDiv
}
