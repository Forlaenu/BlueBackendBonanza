const { render } = require("express/lib/response")

const listingForm = document.querySelector('#listingForm')
listingForm.addEventListener('submit', (e) => {
    e.preventDefault()

    axios.post('/users/listing', {
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value
    })

})

function renderBookInfo(books) {
    const html = books.map(book => {
        return `<div>
        <div
            <div class="column">
                <div class="card">
                        <div class="card-image" style="background-image: url(${imgUrl});">
                            <figure class="image is-4by3">
                                <img src="${book.imgUrl}" class="has-ratio" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-48x48">
                                        <img src="${book.imgUrl}" alt="Placeholder image">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="title is-4">${book.title}</p>
                                    <p class="subtitle is-6">${book.author}</p>    
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
</div>`
    })
}


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