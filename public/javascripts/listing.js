const listingForm = document.querySelector('#listingForm')
listingForm.addEventListener('submit', (e) => {
    e.preventDefault()

    axios.post('/users/listing', {
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value
    })
  
})

