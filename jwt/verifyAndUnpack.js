const jwt = require('jsonwebtoken')
const {readFileSync} = require("fs")
const path = require("path");

function verifyAndUnpack(token) {
    const publicKey = readFileSync(path.join(process.cwd(), "RSA", "public.pem"))
    try {
        const tokenData = jwt.verify(token, publicKey, {algorithms: ['RS256'],issuer:"NextGenX Private Limited"})
        return {status: "ok", tokenData}
    } catch (error) {
        return {status:"error", message: error}
    }
}
module.exports = verifyAndUnpack