document.addEventListener('DOMContentLoaded', function () {
    // code here will execute after the document is loaded
    axios.get('/books/AOTD')
    .then(res => {
        renderAuthorOfTheWeek(res.data)
    })
  });
  
  document.addEventListener('DOMContentLoaded', function () {
      axios.get('/books/BOTW')
      .then(res => {
          renderBooksOfTheWeek(res.data.results.books)
      })
  })

  document.addEventListener('DOMContentLoaded', function () {
    axios.get('/books/TBOTW:id')
    .then(res => {
        renderBookOfTheWeek(res.data.results.books[0])
    })
})
//gets  all the books for the week
  function renderBooksOfTheWeek(books) {
    const booksHtml =  books.map(book => {
        return `
            <li>${book.title} by ${book.author}</li>
        `
    })
    const results = document.querySelector('#results');
    results.innerHTML = booksHtml.join('');
    };


  // gets author of the week
function renderAuthorOfTheWeek(author) {
    const authorsHtml =  `
            <h1>Author of the Week!</h1>
            <h2>${author.name}</h2>
            <p>${author.summary}</p> 
        `
    document.querySelector('#AOTD').innerHTML = authorsHtml
}

//gets one book of the week
function renderBookOfTheWeek(books) {
    const bookHtml = `
        <h2>${books.title} by ${books.author}</h2>
         <p>${books.description}</p>
        

         <p>From the author of the classic A Little Life—a bold, brilliant novel spanning three centuries and three different versions of the American experiment, about lovers, family, loss and the elusive promise of utopia.</p>

         <p><strong>Want to Purchase? </strong><a href="${books.amazon_product_url}">Click Here</a></p>
         <p><a href="${books.buy_links[1].url}">Or Here</a></p>
         <p><a href="${books.buy_links[2].url}">Or Here</a></p>
        `


        document.querySelector('#bresults').innerHTML = bookHtml;
        document.querySelector('#imgauthor').setAttribute("src", books.book_image)
        document.querySelector('#lotsoffun').setAttribute("style",`background-image: url(${books.book_image})`)

    };
