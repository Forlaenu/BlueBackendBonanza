const user = JSON.parse(localStorage.getItem('user'))






// const { default: axios } = require("axios");

document.addEventListener('DOMContentLoaded', function () {
    // code here will execute after the document is loaded
    
});
document.addEventListener('click', (event)=> {
    if(event.target.classList.contains('add-to-faves')){
        let bookId = event.target.dataset.apiid
        let userId = JSON.parse(window.localStorage.getItem('user')).id
        createListingFave(bookId, userId)
        // document.querySelector('#createListingForm').setAttribute("style", "display:block")
        // axios.get(`/books/${bookId}`)
        // .then(res => {
        //     let booklist = []
        //     booklist.push(res.data)
        //     renderBookInfo(booklist)
        // })
    }

})

function createListingFave(bookId, userId){
    console.log(`creating listing from ${bookId}, under user ${userId}`)
    axios.get(`/books/${bookId}`, {})
        .then(res => {
            let userAddedBook = res.data
            axios.post(`/books/${bookId}/listing`, {
                // userAddedBook = res.data
                title: userAddedBook.volumeInfo.title,
                author: (!("authors" in userAddedBook.volumeInfo)) ? "No Author": userAddedBook.volumeInfo.authors[0],
                isbn: (!("industryIdentifiers" in userAddedBook.volumeInfo)) ? "N/A" : (userAddedBook.volumeInfo.industryIdentifiers[0].type == "ISBN_13") ? userAddedBook.volumeInfo.industryIdentifiers[0].identifier : userAddedBook.volumeInfo.industryIdentifiers[1].identifier,
                apiId: userAddedBook.id,
                imgUrl: (!("imageLinks" in userAddedBook.volumeInfo)) ? "/img/image_not_found.gif" : userAddedBook.volumeInfo.imageLinks.thumbnail,
                blurb: (!("description" in userAddedBook.volumeInfo)) ? "No description given" : userAddedBook.volumeInfo.description,
                UserId: userId,
                own: false,
            })
            .then(res => {
                console.log(res)
                if(res.status = 200){

                }
            })
        })
        // .catch(error => {res.status(400).json({error: error})})
}

// const listingInfo = `<div class="content">
// <div class="own">
//     ${listing.own}
// </div>
// <div class="condition">
//     ${listing.condition}
// </div>
// <div class="frontUrl">${listing.frontUrl}</div>
// <div class="backUrl">${listing.backUrl}</div>
// <div class="spineUrl">${listing.spineUrl}</div>
// <br>
// </div>`

function renderBookInfo(listings) {
    document.querySelector('#listings .columns').innerHTML = "";
    const bookHtml = listings.map(listing => {
        return `
            <div class="column is-4">
                <div class="card">
                        <div class="card-image" style="background-image: url(${(!("imageLinks" in listing.volumeInfo)) ? null : listing.volumeInfo.imageLinks.thumbnail});">
                            <figure class="image is-4by3">
                                <img src="${(!("imageLinks" in listing.volumeInfo)) ? src="/img/image_not_found.gif" : listing.volumeInfo.imageLinks.thumbnail}" class="has-ratio" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media"> 
                                <div class="media-left">
                                    <figure class="image is-48x48">
                                        <img src="${(!("imageLinks" in listing.volumeInfo)) ? src="/img/image_not_found.gif" : listing.volumeInfo.imageLinks.thumbnail}" alt="Placeholder image">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="title is-4">${listing.volumeInfo.title}</p>
                                    <p class="subtitle is-6">${(!("authors" in listing.volumeInfo)) ? "No Author" : listing.volumeInfo.authors[0]}</p>    
                                </div>
                            </div>
                            <div class="content">
                            <div class="description">
                            ${(!("description" in listing.volumeInfo)) ? "No description given" : listing.volumeInfo.description.substring(0, 500)}
                            </div>
                            </div>
                            
                        </div>
                        <footer class="card-footer">
                        ${user ? `
                        <button class="button is-inverted card-footer-item createListing" data-apiId="${listing.id}">Create Listing</button>
                        <button class="button is-inverted card-footer-item add-to-faves" data-apiId="${listing.id}">Add to Faves</button>
                        `:`
                        <button class="button is-inverted card-footer-item createListing" disabled data-apiId="${listing.id}">Create Listing</button>
                        <button class="button is-inverted card-footer-item addFaves" disabled data-apiId="${listing.id}">Add to Favs</button>
                        `}
                        
                            </footer>
                            </div>
                            </div>
                            </div>
                            `

    }).join('')
    document.querySelector('#listings .columns').innerHTML = bookHtml
}

{/* <button id="addToFavesButton" class="add-to-faves" data-apiId="${listing.id}">Add to faves</button> */}

{/* <a href="#" class="card-footer-item">Delete</a> */ }
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
const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    axios.post('/books/', {
        searchQuery: document.querySelector('.searchBar').value
    })
        .then(res => {
            renderBookInfo(res.data)
        })
})

// axios.get

// url = /books/


// if (!user) {
//     window.location = "/login.html"
// }
axios.get(`/users/${user.id}/Profile/listing`)
    .then(res => {
        try{
            renderBookInfo(res.data.Listings)
        }
        catch{console.log("failed to render books in initial page")}
    })


function createListing(bookID) {
    const listingForm = document.querySelector('#listingForm')
    listingForm.addEventListener('submit', (e) => {
        e.preventDefault()
        axios.post()

        axios.post('/users/listing', {

            own: document.querySelector('#own').value,
            condition: document.querySelector('#condition').value,
            // how to get value of files?
            frontUrl: document.querySelector('#frontUrl').value,
            backUrl: document.querySelector('#backUrl').value,
            spineUrl: document.querySelector('#spineUrl').value,
        })

    })
}



// document.addEventListener('click', (event)=> {
//     if(event.target.classList.contains('add-to-faves')){
//         let bookId = event.target.dataset.apiid
//         let userId = window.localStorage.getItem('user').
    

// })