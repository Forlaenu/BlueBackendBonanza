let userInfo = localStorage.getItem('user')

if(userInfo){
    axios.get('/users/logout')
    .then(res =>{
        if(res.status = 200){
            alert('logged out successfully')
            localStorage.removeItem('user')
            window.location = '/index.html'
        }
    })
}
else{
    window.location = '/index.html'
}