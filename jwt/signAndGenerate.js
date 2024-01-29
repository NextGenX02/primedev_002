const jwt = require('jsonwebtoken')
const {readFileSync} = require("fs")
const path = require("path");

function signAndGenerate(data) {
    const privateKey = readFileSync(path.join(process.cwd(), "RSA", "private.pem"))
    return jwt.sign({shikuData:data}, privateKey, {algorithm: 'RS256',expiresIn: "1d",issuer:"NextGenX Private Limited",})
}

module.exports = signAndGenerate