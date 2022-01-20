const user = JSON.parse(window.localStorage.getItem('user'))
if (user){
    const loggedInUser = document.getElementById('username-profile')
    loggedInUser.innerHTML = "@" + user.username
}

axios.get(`/users/${user.id}/Profile/`)
    .then(res => {
        console.log
    })
