const searchBook = () => {
  const searchField = document.getElementById("input-field");
  const searchValue = searchField.value;
  console.log(searchValue);
  fetch(`http://openlibrary.org/search.json?q=${searchValue}`)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data));
};

const displaySearchResult = (books) => {
  const resultContainer = document.getElementById("search-result");
  books.docs.forEach((singleBook) => {
    const { title, author_name, publish_data } = singleBook;
    const bookCard = document.createElement("div");
    bookCard.classList.add("col");
    bookCard.innerHTML = `
        <div class="card shadow mt-5">
            <div class="card-body">
                <h5 class="card-title">Book Title : ${title}</h5>
                <h6 class="card-title">Author : ${author_name[0]}</h6>
                <p class="card-text">Publish Data : ${publish_data[0]}</p>
          </div>
        </div>
      `;
    resultContainer.appendChild(bookCard);
  });
  console.log(books);
};
