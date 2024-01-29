const express = require('express');
const router = express.Router();
// const jwtTokenVerify = require('../../../jwt/verifyAndUnpack')

// Load track data from database
const trackDB = require('../../../database/music_data.json')

/* GET Nextcamp features info */
router.get('/feature', function(req, res, next) {
    let features = []
    for (let i = 0; i < trackDB.musicData.length; i++) {
        if (trackDB.musicData[i].feature) {
            features.push(trackDB.musicData[i])
        }
    }
    res.status(200).json({features})
});

module.exports = router;
