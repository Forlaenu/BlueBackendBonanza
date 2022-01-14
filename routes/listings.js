const express = require('express');
const checkAuth = require('../checkAuth');
const db = require('../models');
const router = express.Router();




// get listings


router.post('/create', (req, res, next) => {
    db.Listing.findAll({
        where: {UserId:req.body.UserId}
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

module.exports = router;
//delete listings
