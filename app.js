const container = document.querySelector('.container');
let myLibrary = [
	{
		title: '1',
		author: '2',
		pages: '3',
		read: '4',
	},
	{
		title: '1',
		author: '2',
		pages: '3',
		read: '4',
	},
	{
		title: '1',
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
}

function render() {
	myLibrary.forEach((book) => {
		container.innerHTML += `<div class="book">
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.pages}</p>
      <p>${book.read}</p>
    </div>`;
	});
}

render();

const books = document.querySelectorAll('.book');

function addEventListeners() {
	Array.from(books).forEach((book) => {
		book.addEventListener('click', function(e) {
			console.log(e);
		});
	});
}

addEventListeners()
