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
        let movie = {
            tittle:req.body.tittle,
            dateCreation:req.body.dateCreation,
            calification:req.body.calificaton,
            image:req.body.image
        } 
        Movie.create(movie)
        .then(()=>{
            res.status(201).json({msg:"Movie created !"})
        })
        .catch(err=>{
            console.error(err);
            res.status(500).json({msg:"some error"})
        })
    },
    removeMovie:(req, res)=>{
        let id = req.params.id
        Movie.destroy({where:{id}})
        .then(()=>{
            res.status(200).json({msg:"Movie removed"})
        })
        .catch(err=>{
            console.error(err);
            res.status(500).json({msg:"some error"})
        })
    },
    updateMovie:(req, res)=>{
        let movie = {
            tittle:req.body.tittle,
            calification:req.body.califiaction,
            dateCreation:req.body.dateCreation,
            image:req.body.image
        }
        Movie.update(movie,{where:{id:req.params.id}})
        .then(()=>{
            res.status(200).json({msg:"movie edited !"})
        })
        .catch(err=>{
            console.error(err);
            res.status(500).json({msg:"some error"})
        })
    }
}
module.exports = moviesController