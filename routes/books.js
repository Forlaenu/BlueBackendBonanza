var express = require('express');
const db = require('../models');
var router = express.Router();
const crypt = require('bcrypt')
const axios = require('axios')
const booksapi = require('../booksapi');
const { get, redirect } = require('express/lib/response');

// GET /api/v1/books - searches for books and returns to client (frontend) (previously search)
// GET /api/v1/books/:googleId - get book by id from google API
// GET /api/v1/books/:googleId/listings - get all listings for a book with googleID
// POST /api/v1/books/:googleId/listings - create a new listing for a book with googleId
// GET /api/v1/books/:googleId/listings/:listingId - get details for listing for a book with googleId and a listingId 

// Get /books
// Basic search using book title
router.get('/', (req,res,next)=> {
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
// returns database values 
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
     for(listing of data.Listings){
        
      }
      res.status(200).json(data.Listings)
    }
    else {
      res.status(400).json({error: "No listings found for that book"})
    }
  })
})

module.exports = router;
