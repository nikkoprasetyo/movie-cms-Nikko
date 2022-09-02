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
}

module.exports = UserAdmin