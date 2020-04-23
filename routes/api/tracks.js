const express = require('express');
const router = express.Router();
const getTracks = require('../../data/getTracks');
const addTrack = require('../../data/addTrack');
const updateTrack = require('../../data/updateTrack');
const deleteTrack = require('../../data/deleteTrack');

router.get('/', async function(req, res, next) {
    try {
        const data = await getTracks();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.send(500).send("Internal Server Issue, check logs");
    };
});

router.post('/', async function (req, res, next) {
    try {
        const data = await addTrack(req.body);
        res.send(data);
    } catch(err) {
        if (err.error) {
            res.status(400).send(err);
        } else {
            console.log(err);
            res.status(500).send("Internal Sever Issue, check logs");
        };
    };
});

router.put('/:id', async function (req, res) {
    try {
        const data = await updateTrack(req.params.id, req.body);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send ("Internal Server Issue, chack logs")
    };
});

router.delete('/:id', async function(req, res, next) {
    try {
        const data = await deleteTrack(req.params.id);
        res.send(data);
    } catch(err) {
        if (err.error) {
            res.status(400).send(err);
        } else {
            console.log(err);
            res.status(500).send ("Internal Server Issue, chack logs")
        };
    };
});

module.exports = router;