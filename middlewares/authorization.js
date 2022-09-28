function authorization(req, res, next) {
    let role = req.user.role
    if (role !== "admin") {
        throw { name: "Unathorized" }
    } else {
        next()
    }
    
}
module.exports = authorization