function errorHandlers(err, req, res, next) {
    console.log(err, 'this is error');
    if (err.name === "No user in database") {
        res.status(401).json({ Message: "Invalid username" })
    } else if (err.name === "Unathorized") {
        res.status(401).json({ Message: "Unathorized" })
    } else if (err.name === "Wrong Password") {
        res.status(401).json({ Message: "Invalid password" })
    } else if (err.name === "Movie Not Found") {
        res.status(404).json({ Message: "Movie Not Found"})
    } 
    // else if (err.errors.length === 2 && err.name === "SequelizeValidationError") {
    //     res.status(400).json({ Message: err.errors[1].message })
    // } 
    else if (err.name === "SequelizeValidationError") {
        res.status(400).json({ Message: err.errors[0].message })
    } else if (err.name === "SequelizeUniqueConstraintError") { 
        res.status(400).json({ Message: err.errors[0].message })
    } 
    // else {
    //     res.status(500).json({ Message: err.errors[0].message })
    // }
    
    
}

module.exports = errorHandlers