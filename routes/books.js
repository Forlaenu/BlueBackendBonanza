var express = require('express');
const db = require('../models');
var router = express.Router();
const crypt = require('bcrypt')

// POST /books/storeInDb
router.post('/storeindb', function(req, res, next) {
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
      // create a book in Book database: title, author, isbn, apiId (may not be needed), imgUrl, blurb
      db.Book.create({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        apiId: req.body.apiId,
        imgUrl: req.body.imgUrl,
        blurb: req.body.blurb,
      })
      .then(createdBook => {
        console.log(`Book created successfully: ${createdBook.title}, ISBN: ${createdBook.isbn}`)
      })
      res.status(200).json({success: "Book created"})
    } //end else
  })
});

router.get('/:id', (req,res,next)=>{
  
})
module.exports = router;
