const express = require('express')
const router = express.Router()
const UserAdmin = require('../controllers/userAdmin')
const errorHandler = require('../middlewares/errorHandler')


router.post('/register', UserAdmin.register)

router.use(errorHandler)

module.exports = router