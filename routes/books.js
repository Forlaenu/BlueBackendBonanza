var express = require('express');
const db = require('../models');
var router = express.Router();
const crypt = require('bcrypt')

// POST /books/storeInDb
router.post('/storeInDb', function(req, res, next) {
  // TODO: check for required fields= title, author, isbn, apiId(api specific id?), blurb
  if (!req.body.title || !req.body.author || !req.body.isbn || !req.body.apiId || !req.body.blurb) {
    res.status(400).json({
      error: 'please include all required fields'
    })
    return
  }

  db.Book.findAll({
    where: {
      isbn: req.body.isbn
    }
  }).then(books =>  {
    // if there is an existing book ??? pass?
    if (books.length) {
      console.log(`Backend log: ${books.isbn} already in DB`)
    } //end if
    // otherwise add book to DB
    else {
    db.Book.create({
        
    })
    } //end else
  })
});

module.exports = router;