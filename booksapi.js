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

function searchId(apiId) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes/${apiId}`, {
        params: {
            key: process.env.GOOGLE_API_KEY,
        }
    })
       .then(res => {
           return (res.data) || []
       })
}

function searchisbn(isbn) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: {
            key: process.env.GOOGLE_API_KEY,
            q: `+isbn:${isbn}`
            
        }
    })
       .then(res => {
           return (res.data) || []
       })
}

module.exports = {
    search, searchId, searchisbn
}