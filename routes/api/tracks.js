const express = require('express');
const router = express.Router();
const getTracks = require('../../data/getTracks');
const addTrack = require('../../data/addTrack');
// const updateTrack = require('../../data/updateTrack');
// const deleteTrack = require('../../data/deleteTrack')

router.get('/', async function(req, res, next) {
    try {
        const data = await getTracks();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.send(500, "Internal Server Issue, check logs");
    };
});

router.post('/', async function (req, res, next) {
    try {
        const track = await addTrack(req.body);
        res.send(track);
    } catch(err) {
        if (err.error) {
            res.status(400).send(err);
        } else {
            console.log(err);
            res.status(500).send("Internal Sever Issue, check logs")
        };
    };
});

module.exports = router;