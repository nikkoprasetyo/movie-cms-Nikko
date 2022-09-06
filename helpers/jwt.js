let jwt = require('jsonwebtoken')

function jwtSignInToken(payload) {
    return jwt.sign(payload, process.env.SECRET)
}

function verify(token) {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = { jwtSignInToken, verify }