const Movie = require("./../database/models").Movie
 const moviesController = {
    allMovies:(req, res)=>{
        Movie.findAll({include:[{association:"MovieCharacter"},{association:"MovieGenre"}],attributes:["image","tittle", "dateCreation"]})
        .then(movies=>{
            res.status(200).json({movies})
        })
    }
 }
 module.exports = moviesController