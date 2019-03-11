const express = require('express');
const router = express.Router();


const Song = require('../models/Song');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

router.get('/song/add/:forum_id', isAuthenticated, (req, res) => {
    const forum_id = req.params.forum_id
    res.render('song/add-song', { forum_id });

})

router.post('/song/new/:forum_id', isAuthenticated, async (req, res) => {
    const forum_id = req.params.forum_id
    
    
})


module.exports = router;