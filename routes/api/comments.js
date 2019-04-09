const express = require('express');
const router = express.Router();
const sendgrid = require('../../services/sendgrid');
const mongoose = require('mongoose');
const jwt_decode = require('jwt-decode');
const passport = require('passport');

// Load model
const Comment = require('../../models/Comment');
const Ticket = require('../../models/Ticket');

// @route   GET api/comments/test
// @desc    Tests route
// @access  Private

router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    console.log(decoded)
    res.json({msg:"Welcome to final boss"})
})

// @route   POST api/comments
// @desc    create comments
// @access  Private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    // find ticketId
    // getTicketId
    newComment = new Comment({
        userId: decoded.id,
        name: decoded.name,
        message: req.body.message
    });


    comment = Ticket.findOne({content: req.body.content})
            .then(ticket=>{
                // console.log(newComment)
                // console.log(ticket)
                newComment.ticketId = ticket.id
                newComment.message = req.body.message
                newComment.save().then(comment=>console.log(comment)).catch(err=>console.log(err))
            })

    res.send(newComment);
})

// @route   GET api/comments
// @desc    get comments from a ticket content
// @access  Private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    let ticketId;
    
    Ticket.aggregate([
        {$match:{
            content: req.body.content
        }}
    ], function(err, result){
            // console.log("Ticket ID: " + result[0]._id)
            ticketId = result[0]._id
            // console.log(ticketId);

            Comment.aggregate([
                {$match:{
                    ticketId: ticketId
                }}
            ], function(err, comments){
                res.send(comments)
            })
    })
})

module.exports = router;