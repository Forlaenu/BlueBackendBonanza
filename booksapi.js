require('dotenv').config()
const axios = require('axios');


function search(term) {
     return axios.get(`https://www.googleapis.com/books/v1/volumes`, {
         params: {
             key: process.env.GOOGLE_API_KEY,
             q:term
         }
     })
        .then(res => {
            return (res.data.items) || []
        })
}


module.exports = {
    search
}