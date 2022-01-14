const registerForm = document.querySelector('#registerForm')
registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    axios.post('/users/register', {
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value
    })
})

