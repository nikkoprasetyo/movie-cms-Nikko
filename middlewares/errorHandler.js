function errorHandlers(err, req, res, next) {
    console.log(err);
    if (err.errors.length === 2 && err.name === "SequelizeValidationError") {
        res.status(400).json({ Message: err.errors[1].message })
    } else if (err.name === "SequelizeValidationError") {
        res.status(400).json({ Message: err.errors[0].message }) //? Kenapa errortype tidak muncul
    }
}

module.exports = errorHandlers