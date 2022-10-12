const { Op } = require("sequelize")
const sequelize = require("sequelize")
const Movie = require("./../database/models").Movie
const db = require("./../database/models")
const moviesController = {

    allMovies: (req, res) => {
        let where={
            tittle:{[Op.substring]:req.query.tittle?req.query.tittle:""}
        };
        let order =[
            ["tittle",req.query.order?.toLowerCase()=="desc"?req.query.order:"ASC"]
        ]
        Movie.findAll({
            where,
            order,
            include: [
                {
                    association: "MovieCharacter",
                    attributes: ["name", [sequelize.fn('concat', "http://localhost:", process.env.PORT, "/characters/", sequelize.col("CharacterId")), "detail"]]
                },
                {
                    association:"MovieGenre",
                    required:req.query.genres?true:false,
                    attributes: { exclude: ["id"] },
                    where:{name:{[Op.substring]:req.query.genres?req.query.genres:""}}
                }],

            attributes: ["tittle", [sequelize.fn("concat","http://localhost:",process.env.PORT,"/image/movies/",sequelize.col("Movie.image")),"image"], "dateCreation",
                [sequelize.fn('concat', "http://localhost:", process.env.PORT, "/movies/", sequelize.col("Movie.id")), "detail"]]
        })
            .then(movies => {
                res.status(200).json({ movies })
            })
    },

    movieDetail: (req, res) => {
        Movie.findOne({
            where: { id: req.params.id },
            include: [
                {
                    association: "MovieCharacter",
                    attributes: ["name", "image", [sequelize.fn('concat', "http://localhost:", process.env.PORT, "/characters/", sequelize.col("characterId")), "detail"]]
                },
                {
                    association: "MovieGenre",
                    attributes: ["name", "image"]
                }
            ],
            attributes:["tittle","dateCreation",[sequelize.fn("concat","http://localhost:",process.env.PORT,"/image/movies/",sequelize.col("Movie.image")),"image"],"calification"]
        })
            .then(movie => {
                res.status(200).json(movie)
            }).catch(err => {
                console.log(err);
                res.status(500).json({ msg: "some error" })
            })
    },
    addMovie: async (req, res) => {
        let movie = {
            tittle: req.body.tittle,
            dateCreation: req.body.dateCreation,
            calification: req.body.calificaton,
            image: req.body.image
        }
        Movie.create(movie)
            .then(() => {
                res.status(201).json({ msg: "Movie created !" })
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ msg: "some error" })
            })

    },
    removeMovie: (req, res) => {
        let id = req.params.id
        Movie.destroy({ where: { id } })
            .then(() => {
                res.status(200).json({ msg: "Movie removed" })
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ msg: "some error" })
            })
    },
    updateMovie: async (req, res) => {
        let charactersInDb = []
        try {
            if (req.body.characters) {
                let characters = req.body.characters.split(",")
                console.log(characters);
                for (let i = 0; i < characters.length; i++) {
                    await db.Character.findOne({ where: { name: characters[i] } })
                        .then(character => {
                            if (character != null) {
                                charactersInDb.push(character.dataValues)
                            }
                        })
                }

                for (let i = 0; i < charactersInDb.length; i++) {
                    let relation = {
                        movieId: Number(req.params.id),
                        characterId: charactersInDb[i].id
                    }
                    await db.MovieCharacter.create(relation)
                }
            }

            let movieGenreInDb = []
            if (req.body.genres) {
                let genres = req.body.genres.split(",")
                for (let i = 0; i < genres.length; i++) {
                    await db.Genre.findOne({ where: { name: genres[i] } })
                        .then(genre => {
                            if (genre != null) {
                                movieGenreInDb.push(genre.dataValues)
                            } else {
                                db.Genre.create({ name: genres[i], image: "default.jpg" })
                            }
                        })
                }

                for (let i = 0; i < movieGenreInDb.length; i++) {
                    let relation = {
                        movieId: Number(req.params.id),
                        genreId: movieGenreInDb[i].id
                    }
                    db.MovieGenre.create(relation)
                }
            }
        } catch (error) {
            console.error(error);
        } finally {


            let movie = {
                tittle: req.body.tittle,
                calification: req.body.califiaction,
                dateCreation: req.body.dateCreation,
                image: req.body.image
            }
            Movie.update(movie, { where: { id: req.params.id } })
                .then(() => {
                    res.status(200).json({ msg: "movie edited !" })
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ msg: "some error" })
                })
        }
    }
}
module.exports = moviesController