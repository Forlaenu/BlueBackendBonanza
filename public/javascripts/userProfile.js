document.addEventListener('DOMContentLoaded', function () {
    axios.get('/users/userProfile')
    .then(res => {
        renderUserInfo(res.data.results.username)
    })
})


function renderUserInfo(user) {
    const usersHtml =  `
    <p class="subtitle is-6">${users.username}</p> 
        `
    document.querySelector('#userProfile').innerHTML = usersHtml
}