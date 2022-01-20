// https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=yourkey
const axios = require('axios')
require('dotenv').config()
const hardcoverFiction = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json`;
const listNames = 'https://api.nytimes.com/svc/books/v3/lists/names.json'

function getTopSellers() {
    return axios.get(hardcoverFiction, {
        params: {
            'api-key': process.env.NYT_API_KEY,
        }
    })
       .then(res => {
           return (res.data) || []
       })
}

module.exports = {
    getTopSellers
}