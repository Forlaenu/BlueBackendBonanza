var express = require('express');
var router = express.Router();
const booksapi = require('../booksapi')

/* GET home page. */
router.get('/search', function(req, res, next) {
  booksapi.search("beloved")
  .then(books => {
    res.json(books)
  })
});

module.exports = router;
