document.getElementById("error-message").style.display = "none";
document.getElementById("loading-spinner").style.display = "none";

const searchBook = () => {
  const searchField = document.getElementById("input-field");
  const searchValue = searchField.value;
  searchField.value = "";

  if (searchValue === "") {
    document.getElementById("error-message").style.display = "block";
  } else {
    document.getElementById("loading-spinner").style.display = "block";
    fetch(`http://openlibrary.org/search.json?q=${searchValue}`)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data))
      .catch((error) => {
        document.getElementById("error-message").style.display = "block";
      });
  }
};

const displaySearchResult = (books) => {
  document.getElementById("error-message").style.display = "none";
  document.getElementById("loading-spinner").style.display = "none";
  document.getElementById("heading").style.display = "none";

  const resultContainer = document.getElementById("search-result");
  resultContainer.innerHTML = "";

  books.docs.slice(0, 40).forEach((singleBook) => {
    const { title, author_name, publish_date, cover_i, author_key } =
      singleBook;
    const bookCard = document.createElement("div");

    bookCard.classList.add("col");
    bookCard.innerHTML = `
        <div class="card shadow mt-5">
            <div>
            <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" alt="" class="card-img-top w-full">
            </div>
              <div class="card-body">
                    <h5 class="card-title">Book Title : ${
                      title ? title : "N/a"
                    }</h5>
                    <h6 class="card-title">Author Name : ${
                      author_name?.[0]
                    }</h6>
                    <p class="card-text">Publish Date : ${publish_date?.[0]}</p>
              </div>
              <div class="card-footer">
              <button class="btn btn-outline-dark btn-sm" onclick="loadAuthorDetail('${
                author_key?.[0]
              }')">Author Details</button>
              </div>
        </div>
      `;
    resultContainer.appendChild(bookCard);
  });
};

const loadAuthorDetail = (authId) => {
  fetch(`https://openlibrary.org/authors/${authId}.json`)
    .then((res) => res.json())
    .then((data) => displayAuthorDetail(data));
};

const displayAuthorDetail = (author) => {
  const { name, birth_date, bio } = author;
  const authorDetail = document.getElementById("author-detail");
  authorDetail.innerHTML = `
      <div>
          <h5 class="card-title">Author Name : ${name}</h5>
          <h6 class="card-title">Author DOB : ${
            birth_date ? birth_date : "N/a"
          }</h6>
          <p class="card-text">Author Bio : ${bio ? bio : "N/a"}</p>
      </div>
  `;
};
