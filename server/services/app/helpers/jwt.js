const jwt = require('jsonwebtoken')
// require('dotenv').config()

const createToken = (payload) => {
    return jwt.sign(payload, "hacktiv8-phase3")
}

const verifyToken = (token) => {
    return jwt.verify(token, "hacktiv8-phase3")
}

module.exports = {
    createToken,
    verifyToken
}