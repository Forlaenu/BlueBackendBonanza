user = JSON.parse(window.localStorage.getItem('user'))
if (user){
    const loggedInUser = document.getElementById('username-profile')
    loggedInUser.innerHTML = "@" + user.username
}

function renderListings(listings) {
    const html = listings.map(listing => {
        return `<div class="column">
        <img src="${listing.Book.imgUrl}">
        <h3>${listing.Book.title}<h3>
      </div>`
    }).join('')
    document.querySelector('#profile-listings').innerHTML = html
}

axios.get(`/users/${user.id}/Profile/`)
    .then(res => {
       renderListings(res.data.Listings)
    })
