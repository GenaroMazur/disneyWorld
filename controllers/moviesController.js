const  sequelize = require("sequelize")
const Movie = require("./../database/models").Movie
const moviesController = {

    allMovies:(req, res)=>{

        Movie.findAll({
            include:[
                {
                    association:"MovieCharacter",
                    attributes:["name",[sequelize.fn('concat',"http://localhost:",process.env.PORT,"/characters/", sequelize.col("CharacterId")),"detail"]]
                },
                {
                    association:"MovieGenre",
                    attributes:{exclude:["id"]}
                }],

            attributes:["tittle","image","dateCreation",
            [sequelize.fn('concat',"http://localhost:",process.env.PORT,"/movies/", sequelize.col("Movie.id")),"detail"]]
        })
        .then(movies=>{
            res.status(200).json({movies})
        })
    },

    movieDetail:(req, res)=>{
        Movie.findOne({
            where:{id:req.params.id},
            include:[
                {
                    association:"MovieCharacter",
                    attributes:["name","image",[sequelize.fn('concat',"http://localhost:",process.env.PORT,"/characters/", sequelize.col("characterId")),"detail"]]
                },
                {
                    association:"MovieGenre",
                    attributes:["name","image"]
                }
            ]
        })
        .then(movie=>{
            res.status(200).json(movie)
        }).catch(err=>{
            console.log(err);
            res.status(500).json({msg:"some error"})
        })
    },
    addMovie:(req, res)=>{

    },
    removeMovie:(req, res)=>{

    },
    updateMovie:(req, res)=>{
        
    }
}
module.exports = moviesController