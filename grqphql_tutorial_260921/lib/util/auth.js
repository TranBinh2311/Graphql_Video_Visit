const jwt = require('jsonwebtoken')

const createJSonWebToken = (user) =>{
    return jwt.sign( {user}, process.env.JWT_SCRET , {
        expiresIn : process.env.JWT_EXPIRED_IN 
    });
}

module.exports = { createJSonWebToken }