const express = require('express');
const router = express.Router();


const Foro = require('../models/Forum');
const Song = require('../models/Song');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

router.get('/foro', isAuthenticated, async (req, res) => {
    const foros = await Foro.find({user: req.user.id}).sort({date: 'desc'});
    res.render('foro/index', { foros });
});

router.get('/foro/add', isAuthenticated, (req, res) => {
    res.render('foro/add-forum');
});

router.get('/foro/all', isAuthenticated, async  (req, res) => {
    const foros = await Foro.find().sort({date: 'desc'});
    res.render('foro/all-forums', { foros });
});

router.get('/foro/songs/:id', isAuthenticated, async (req, res) => {
    const forum_id = req.params.id;
    const songs = await Song.find({forum_id: forum_id}).sort({date: 'desc'});
    res.render('foro/forum-songs', { forum_id, songs });
})

router.post('/foro/new', isAuthenticated, async (req, res) => {
    const name = req.body.name;


    if (!name) {
        errors.push({text: 'Please Write a Title.'});
    } else {
        // Saving a New User
        const newForum = new Foro({ name });
        newForum.user = req.user.id;
        await newForum.save();
        req.flash('success_msg', 'Foro nuevo creado');
        res.redirect('/foro');
    }
})

// Delete Notes
router.delete('/foro/delete/:id', isAuthenticated, async (req, res) => {
    await Foro.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/foro');
  });

module.exports = router;