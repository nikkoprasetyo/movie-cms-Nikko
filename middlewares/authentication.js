const { verify } = require("../helpers/jwt");
const { User } = require('../models')

async function authentication(req, res, next) {
    const { access_token } = req.headers
    let { email } = verify(access_token)
    try {
        let findUser = await User.findOne({ where: { email } })
        // console.log(findUser);
        if (!findUser) {
            throw { name: "JsonWebTokenError"}
        } else {
            req.user = { 
                id: findUser.id,
                email: findUser.email,
                role: findUser.role 
            }
            next()
        }
        
    } catch (error) {
        next(error)
    }
}

module.exports = authentication