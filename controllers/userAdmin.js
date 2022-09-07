const { comparePassword } = require('../helpers/bcrypt')
const { jwtSignInToken } = require('../helpers/jwt')
const { User } = require('../models')

class UserAdmin {
    static async register(req, res, next){
        try {
            let { username, email, password } = req.body
            let newUser = await User.create({ username, email, password})
            res.status(201).json({ id: newUser.id, email: newUser.email})
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next){
        try {
            let { email, password } = req.body
            try {
                let findUser = await User.findOne({ where: { email } })
                // console.log(findUser)
                if (!findUser) {
                    throw { name: "No user in database" }
                }
                if (!comparePassword(password, findUser.password)) {
                    throw { name: "Wrong Password"}
                }
                const access_token = jwtSignInToken({
                    id: findUser.id,
                    email: findUser.email
                })
                let id = findUser.id
                let role = findUser.role
                let username = findUser.username
                res.status(200).json({ access_token, id, username, role })
            } catch (error) {
                next(error)
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserAdmin