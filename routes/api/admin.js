// const jwt = require('jsonwebtoken');
// const keys = require('../../config/keys');
const passport = require('passport');
const express = require('express');
const jwt_decode = require('jwt-decode');


const router = express.Router();

// Load User model:
const User = require('../../models/User');


// @route   GET api/admin/tickets
// @desc    Get all tickets
// @access  private

router.get('/tickets', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    console.log("Admin Status: " + decoded.isAdmin)


    if (decoded.isAdmin === false){
        res.sendStatus(403);
        console.log(decoded.isAdmin)
    }

    // Checks the query.
    // E.g: /api/admin/tickets?email=seeyijie.74@gmail.com
    let email = req.query.email;

    // If not set, show all tickets
    if (!email){
        User.find({}, "tickets")
            .then(data => {
                console.log(data);
                res.json(data);
            })
            .catch(err => console.log(err));
    }

    // If set, show the tickets from the email
    User.findOne({email:email}, "tickets")
    .then(data => {
        console.log(data);
        res.json(data);
    })
    .catch(err => console.log(err));
})
    
router.put('/tickets', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    console.log("Admin Status: " + decoded.isAdmin)

    if (decoded.isAdmin === false){
        res.sendStatus(403);
        console.log(decoded.isAdmin)
    }

    let query = {
        _id: decoded.id,
        "tickets.content": req.body.content,
        "tickets.label" : req.body.label
    }


    let updated = {
        "tickets.$.status": (!!req.query.status ? req.query.status : req.body.status),
        "tickets.$.label" : (!!req.query.label  ? req.query.label  : req.body.label )
    }
    User.findOneAndUpdate(query, updated).then(posts=> {
        // console.log("Document updated!")
        // console.log(posts)
        res.send(posts)
    }).catch(err => console.log(err))
})

module.exports = router