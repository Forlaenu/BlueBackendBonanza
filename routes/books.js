var express = require('express');
const db = require('../models');
var router = express.Router();
const crypt = require('bcrypt')
const axios = require('axios')
const booksapi = require('../booksapi');
const { get, redirect } = require('express/lib/response');
const { getSummary } = require('../wikiapi');
const { getTopSellers } = require('../newyorktimesapi');


// GET /api/v1/books - searches for books and returns to client (frontend) (previously search)
// GET /api/v1/books/:googleId - get book by id from google API
// GET /api/v1/books/:googleId/listings - get all listings for a book with googleID
// POST /api/v1/books/:googleId/listings - create a new listing for a book with googleId
// GET /api/v1/books/:googleId/listings/:listingId - get details for listing for a book with googleId and a listingId 

// Get /books
// Basic search using book title
router.post('/', (req,res,next)=> {
  // receive from front end search bar value - this will simply be searching book by title for now
  // check if searchQuery is empty
  if(!req.body.searchQuery){
    res.status(400).json({
      error: 'Cannot search with an empty query; searchQuery is null'
    })
    return
  }
  // format search for api (spaces become '+')
  const bookQuery = req.body.searchQuery.replace(/\s/g, '+')
  // send api call for books with searchQuery
  booksapi.search(bookQuery)
  // receive back a list of books
  .then(apiBooks => {
    // add to DB, but check if DB has book(s) already
    res.status(200).json(apiBooks)
  })// end .then on booksapi.search
})// end router.get

// GET 
router.get('/isbn', (req,res,next)=>{
  if(!req.body.isbn){
    res.status(400).json({
      error: 'Cannot search with an empty isbn; isbn is null'
    })
    return
  }
  // send api call for books with isbn
  booksapi.searchisbn(req.body.isbn)
  // receive back a list of books
  .then(apiBook => {
    // add to DB, but check if DB has book(s) already
    res.status(200).json(apiBook)
  })// end .then on booksapi.search
})// end router.get

//get top selling books
router.get('/BOTW', (req, res) => {
  getTopSellers()
  .then(data => {
    res.json(data)
  })
})

//Get summary of author
router.get('/AOTD', (req, res) => {
  getSummary('Fernando A. Flores')
  .then(summary => {
    res.json(summary)
  })
})

// get the book of the week
router.get('/TBOTW:id', (req, res) => {
  getTopSellers()
  .then(data => {
    res.json(data)
  })
})

// GET /books/:apiId
router.get('/:apiId', (req,res,next)=> {
  // receive from front end search bar value - this will simply be searching book by title for now
  // check if searchQuery is empty
  if(!req.params.apiId){
    res.status(400).json({
      error: 'Cannot search with an empty query; apiId is null'
    })
    return
  }
  // send api call for books with apiId. this function is modified for searching my volume ID
  booksapi.searchId(req.params.apiId)
  // receive back a list of books
  .then(apiBooks => {
    // add to DB, but check if DB has book(s) already
    res.status(200).json(apiBooks)
  })// end .then on booksapi.search
})// end router.get

// GET /books/:apiId/listings - get all listings for a book with googleID
// returns database values for book, as well as a key "Listings" with value [key, value] for DB listings
router.get('/:apiId/listings', (req,res,next) => {
  db.Book.findOne({
    where: { 
      apiId : req.params.apiId
    },
    include: db.Listing,
  })
  .then(data =>{
    if(data){
      res.status(200).json(data)
    }
    else {
      res.status(400).json({error: "No listings found for that book"})
    }
  })
})

// GET /books/:apiId/listings/:listingId - get details for listing for a book with googleId and a listingId 
// returns database values for the listing specifically by listingId
router.get('/:apiId/listings/:listingId', (req,res,next) => {
  db.Book.findOne({
    where: { 
      apiId : req.params.apiId
    },
    include: db.Listing,
  })
  .then(data =>{
    // found listings
    if(data){
      //loop over the listings to find the one that matches the :listingId
      let listingFound = false;
     for(listing of data.Listings){
        if(listing.id == req.params.listingId){
          listingFound = true;
          res.status(200).json(listing)
        }
      }
      if(!listingFound){
        res.status(400).json({error: "No listing found or mismatch listingId"})
      }
    }
    else {
      res.status(400).json({error: "No listings found for that book or mismatch book apiId"})
    }
  })
})

// POSt /books/:apiId/listings
// THIS function requires a userId; 
// TODO: Check that a listing doesn't already exist
router.post('/:apiId/listing', (req,res,next) => {
  // check required fields before creating
  if(!req.body.title || !req.body.author || !req.body.isbn || !req.body.apiId || !req.body.imgUrl || !req.body.blurb || !req.body.UserId){
    res.status(400).json({error: "please include all required fields"})
  }
  else{
    // look in DB for book already added to DB
    // console.log("first else, all body keys exist")
    db.Book.findOne({
      where: { 
        apiId : req.params.apiId
      },
    })
    .then(foundBook =>{
      if(!foundBook){
        // console.log("no book found in db, creating one")
        db.Book.create({
          title: req.body.title,
          author: req.body.author,
          isbn: req.body.isbn,
          apiId: req.body.apiId,
          imgUrl: req.body.imgUrl,
          blurb: req.body.blurb,
        }) // end db.book.create
        .then(createdBook => {
          // console.log("book created, making listing")
          // successfully created book, now create listing with that book's ID
          // createdBook.id = BookId for listing
          // req.body.UserId = UserId for listing
          db.Listing.create({
            own: req.body.own || false,
            BookId: createdBook.id,
            UserId: req.body.UserId,
            // added this- mayra
            condition: req.body.condition || null,
            frontUrl: req.body.frontUrl || null,
            backUrl: req.body.backUrl || null,
            spineUrl: req.body.spineUrl || null,
            createdAt: new Date(),
            updatedAt: new Date()
          }) // end db.listing.create
          .then(resultListing => {
            // console.log("listing created successfully from newly created book")
            res.status(200).json({success: `Listing created from created book: ${createdBook.title}, listingId: ${resultListing.id}, with userId: ${req.body.UserId}`})
          }) //end .then db.Listing.create
        })// end .then db.Book.create
      } // end if not book found
      else {
        // console.log("book found in DB. Creating listing based on that book")
          db.Listing.create({
            own: req.body.own || false,
            BookId: foundBook.id,
            UserId: req.body.UserId,
            // added this -mayra
            condition: req.body.condition || null,
            frontUrl: req.body.frontUrl || null,
            backUrl: req.body.backUrl || null,
            spineUrl: req.body.spineUrl || null,
            createdAt: new Date(),
            updatedAt: new Date()
          }) // end db.listing.create
          .then(resultListing => {
            // console.log("DB book listing created successfully")
            res.status(200).json({success: `Listing created from database book: ${foundBook.title}, listingId: ${resultListing.id}, with userId: ${req.body.UserId}`})
          }) //end .then db.Listing.create
      }
    })
    // update this error in the future
    .catch(err => {
      req.status(400).json({error: "something went wrong"})
    })
  }// end if/else required body.elements
})

module.exports = router;
