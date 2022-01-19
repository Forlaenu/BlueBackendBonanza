document.addEventListener('DOMContentLoaded', function () {
    // code here will execute after the document is loaded
});

const listingForm = document.querySelector('#listingForm')
listingForm.addEventListener('submit', (e) => {
    e.preventDefault()

    axios.post('/users/listing', {
        own: document.querySelector('#own').value,
        condition: document.querySelector('#condition').value,
        // how to get value of files?
        frontUrl: document.querySelector('#frontUrl').value,
        backUrl: document.querySelector('#backUrl').value,
        spineUrl: document.querySelector('#spineUrl').value,
    })

})


function renderBookInfo(listings) {
    const bookHtml = listings.map(listing => {
        return `
            <div class="column is-one-quarter">
                <div class="card">
                        <div class="card-image" style="background-image: url(${listing.Book.imgUrl});">
                            <figure class="image is-4by3">
                                <img src="${listing.Book.imgUrl}" class="has-ratio" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-48x48">
                                        <img src="${listing.Book.imgUrl}" alt="Placeholder image">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="title is-4">${listing.Book.title}</p>
                                    <p class="subtitle is-6">${listing.Book.author}</p>    
                                </div>
                            </div>
                            <div class="content">
                                <div class="own">
                                    ${listing.own}
                                </div>
                                <div class="condition">
                                    ${listing.condition}
                                </div>
                                <div class="frontUrl">${listing.frontUrl}</div>
                                <div class="backUrl">${listing.backUrl}</div>
                                <div class="spineUrl">${listing.spineUrl}</div>
                                <br>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="#" class="card-footer-item edit">Edit</a>
                            <a href="#" class="card-footer-item">Delete</a>
                        </footer>
                    </div>
                </div>
        </div>
`
    })
    document.querySelector('#listings .columns').innerHTML = bookHtml
}

// How to get the two components of the card to generate?

function renderListings(listings) {
    const html = listings.map(listing => {
        return `<div>
        <img src="${listing.imgUrl}>
        <div>${listing.own}</div>
        <div>${listing.condition}</div>
        <div>${listing.frontUrl}</div>
        <div>${listing.backUrl}</div>
        <div>${listing.spineUrl}</div>
      </div>`
    }).join('')
    document.querySelector('#listings').innerHTML = html
}


// add event listener to search
// there is another submit button in the listings, how do i distinguish between the two?
const field = document.querySelector(".field");
field.addEventListener('submit', function (event) {
    event.preventDefault();

    axios.get('/books/', {
        searchQuery: document.querySelector('.searchBar').value
    })
        .then(res => {
            bookData = res.Search
            renderBooks(data.Search)
        })

})

// axios.get

// url = /books/

const user = JSON.parse(localStorage.getItem('user'))
if (!user) {
    window.location = "/login.html"
}
axios.get(`/users/${user.id}/Profile/listing`)
    .then(res => {
        renderBookInfo(res.data.Listings)
    })