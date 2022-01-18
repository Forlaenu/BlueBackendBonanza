const listingForm = document.querySelector('#listingForm')
listingForm.addEventListener('submit', (e) => {
    e.preventDefault()

    axios.post('/users/listing', {
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value
    })

})

function renderListings(listings) {
    const html = listings.map(listing => {
        return `<div>
        <div>${listing.text}</div>
        <div>${listing.stars}/5 stars</div>
        <div>${listing.visitedAt}</div>
      </div>`
    }).join('')
    document.querySelector('#listings').innerHTML = html
}

function renderMovies(movies) {
    const movieHtmlArray = movies.map(function (currentMovie) {
        return `<div class="movie col-4">
        <img src="${currentMovie.Poster}"<br/>
        <h2>${currentMovie.Title}</h2>
        <time datetime="\`0001\`">${currentMovie.Year}</time><br>
        <button class="add-button" data-imdbid="${currentMovie.imdbID}">Add Me!</button><br/>
        </div>
        `
    });

    results = document.querySelector("#results");
    results.innerHTML = movieHtmlArray.join('')
};