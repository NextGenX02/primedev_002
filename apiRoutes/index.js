const express = require('express');
const router = express.Router();
const jwtToken = require('../jwt/signAndGenerate')
const config = require('../config/server_config.json')

router.get("/", function (req, res) {
    res.send("OK this is api routes")
})
router.post("/masterpassword", async (req, res) => {
    if (!req.body.password) {
        return res.status(400).json({message:"You need to provide a password to continue"})
    }
    if (req.body.password === config.masterpassword) {
        // set the cookie
        const token = jwtToken({isAuthorise: true})
        return res.status(200).cookie("access_to_resource", token, {expires: 0, httpOnly:true}).json({message:"OK"})
    } else {
        return res.status(401).json({message:"Invalid password"})
    }
})
module.exports = router;