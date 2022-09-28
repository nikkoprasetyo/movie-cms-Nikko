const express = require('express')
const MovieController = require('../controllers/movies')
const router = express.Router()
const UserAdmin = require('../controllers/userAdmin')
const authentication = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandler')
const authorization = require('../middlewares/authorization')

router.post('/register', UserAdmin.register)

router.post('/login', UserAdmin.login)

router.use(authentication)

router.get('/movies', MovieController.getMovies)

router.get('/movies/:id', MovieController.movieDetails)

router.post('/movies', MovieController.addMovie)

router.patch('/movies/:id', MovieController.updateMovie)

router.delete('/movies/:id', authorization, MovieController.deleteMovie)

router.use(errorHandler)

module.exports = router