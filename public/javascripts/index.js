document.addEventListener('DOMContentLoaded', function () {
    // code here will execute after the document is loaded
    axios.get('/books/AOTD')
    .then(res => {
        renderAuthorOfTheWeek(res.data)
    })
  });
  
  function renderBooksOfTheWeek(books) {
    const booksHtmlArray = books.map((book) => {
      console.log(book.title)
      return `
      <article class="tile is-child box">
      <!-- Put any content you want --> 
      <div class="box">
        Top Books of the Week
        <ol>
          <li>${books.title}</li>
        </ol>
      </div>
    </article>`
    });
    const results = document.querySelector('#results');
    results.innerHTML = booksHtmlArray.join('');
  }

  // come back to this one
function renderAuthorOfTheWeek(author) {
    const authorsHtml =  `
            <h1>Author of the Week!</h1>
            <h2>${author.name}</h2>
            <p>${author.summary}</p> 
        `
    document.querySelector('#AOTD').innerHTML = authorsHtml
}


function renderBookOfTheWeek(books) {
    const bookHtmlArray = book.map((book) => {
        console.log(book.title)
        return `
        <article class="tile is-child box">
          <!-- Put any content you want -->
          <h1>Book of the Week!</h1>
        <figure class="image is-128x128">
          <img src="${book.imgUrl}">
        </figure>
        <article class="message">
        <div class="message-body">
        <h3>${book.title}</h3>
         ${book.blurb}
        </div>
      </article>
        </article>
        `
    });
    results.innerHTML = bookHtmlArray.join('');
}