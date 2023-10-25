const bcrypt = require('bcryptjs')

function hashPass(password){
    return bcrypt.hashSync(password)
}

function comparePass(password, hashed){
    return bcrypt.compareSync(password, hashed)
}

module.exports = {
    hashPass,
    comparePass
}