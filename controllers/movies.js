let { Movie, History } = require('../models')

class MovieController {
    static async getMovies(req, res, next){
        try {
            let movies = await Movie.findAll( { where: { isDeleted: false}})
            if (!movies) throw { name: "No movies in database" }
            res.status(200).json({ Movies: movies })
        } catch (error) {
            next(error)
        }
    }

    static async movieDetails(req, res, next){
        let id = +req.params.id
        try {
            let findMovieByID = await Movie.findOne({where: {id, isDeleted: false}})
            if(!findMovieByID) throw { name: `Movie Not Found` }
            res.status(200).json(findMovieByID)
        } catch (error) {
            next(error)
        }
    }

    static async addMovie(req, res, next){
        let {
            title,
            synopsis,
            trailerUrl,
            imageUrl,
            rating,
            UserId, 
            status 
        } = req.body
        try {
            let newMovie = await Movie.create({
                title,
                synopsis,
                trailerUrl,
                imageUrl,
                rating,
                UserId, 
                status
            })
            let newHistory = await History.create({
                title: newMovie.title,
                description: `Movie "${newMovie.title}" with ID ${newMovie.id} has been added to Movie-CMS database`,
                updatedBy: req.user.email,
                MovieId: newMovie.id
            })
        } catch (error) {
            next(error)
        }
    }
    static async updateMovie(req, res, next){
        let movieId = +req.params.id
        let {
            title,
            synopsis,
            trailerUrl,
            imageUrl,
            rating,
            UserId, 
            status 
        } = req.body
        try {
            let updatedMovie = await Movie.update({
                title,
                synopsis,
                trailerUrl,
                imageUrl,
                rating,
                UserId, 
                status
            }, {
                where: { id: movieId },
                returning: true
            }
            )
            let newHistory = await History.create({
                title: updatedMovie[1][0].title,
                description: `This movie ${updatedMovie[1][0].title} has been updated`,
                updatedBy: req.user.email,
                MovieId: movieId
            })
            res.status(200).json(updatedMovie[1][0])
        } catch (error) {
            next(error)
        }
    }
    static async deleteMovie(req, res, next){
        let movieId = +req.params.id
        try {
            let findMovie = await Movie.findOne({ where: { id: movieId, isDeleted: false } })
            if (!findMovie) throw { name: "Movie Not Found"}
            let deleteAMovie = await Movie.update({isDeleted: true}, { where: { id: movieId } })
            res.status(200).json({ message: `Movie with id ${movieId} has been deleted` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MovieController