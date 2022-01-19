var express = require('express');
var router = express.Router();
const booksapi = require('../booksapi')
const nytapi = require('../newyorktimesapi')

/* GET home page. */
router.get('/search', function(req, res, next) {
  booksapi.search("beloved")
  .then(books => {
    res.json(books)
  })
});

router.get('/bestsellers', function(req, res, next) {
  nytapi.getTopSellers()
  .then(books => {
    res.send(books)
  })
});

module.exports = router;
