const user = JSON.parse(localStorage.getItem('user'))

if (user) {
    const loggedIn = document.getElementsByClassName('logged-in')
    for (const element of loggedIn) {
        element.classList.remove('is-hidden')
    }
    const loggedOut = document.getElementsByClassName('logged-out')
    for (const element of loggedOut) {
        element.classList.add('is-hidden')
    }
}