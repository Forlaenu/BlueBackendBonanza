const express = require('express');
const checkAuth = require('../checkAuth');
const db = require('../models');
const router = express.Router();


// POST /listings/create
router.post('/create', (req, res, next) => {
    db.Listing.findAll({
        where: { UserId: req.body.UserId }
    })
        .then(listing => {
            // if ISBM and username are already in listing found, send error
            if (req.body.BookId == listing.BookId && req.body.UserId == listing.UserId) {
                res.status(404).json({ error: 'you cant post the same book twice!' })
                return
            }

            // create listing
            db.Listing.create({
                frontUrl: req.body.frontUrl,
                backUrl: req.body.backUrl,
                spineUrl: req.body.spineUrl,
                condition: req.body.condition,
                own: req.body.own,
                BookId: req.body.BookId,
                UserId: req.body.UserId
            })
                .then(listing => {
                    res.status(201).json(listing)
                })
        })
})
//delete listings
router.delete('./delete', (req, res, next) => {
    db.Listing.destroy({ where: { id: UserId } }) // delete everything that matches this 'where' object
        .then(rowsDeleted => { // rowsDeleted will return number of rows deleted
            if (rowDeleted === req.body.Listing) {
                console.log('Deleted successfully');
            }
        })
        .catch(err => {
            console.log(err);
        });
})

module.exports = router;



