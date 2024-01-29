const express = require('express');
const router = express.Router();
const jwtTokenVerify = require('../../../jwt/verifyAndUnpack')

/* GET Nextcamp userinfo */
router.get('/me', function(req, res, next) {
    if (!req.cookies.nextcamp_access) {
        return res.status(400).json({message:"You need to login!"})
    }
    req.status(200).json({message:"ok"})
});

module.exports = router;
