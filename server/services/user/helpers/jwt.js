const jwt = require('jsonwebtoken')

function createToken(payload){
    return jwt.sign(payload, "rahasia")
}

function verifyToken(token){
    return jwt.verify(token, "rahasia")
}

module.exports = {
    createToken,
    verifyToken
}