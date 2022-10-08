const Character = require("./../database/models").Character
const MovieCharacter = require("./../database/models").MovieCharacter
const db = require("./../database/models")
const {Op} = require("sequelize")
const sequelize = require("sequelize")
const characttersController = {

    allCharacters: (req, res) => {
        let where = {
            name:{[Op.substring]:req.query.name?req.query.name:""}
        }
        if(req.query.age){
            where = {...where, ...{age: req.query.age}}
        }
        Character.findAll({
            where,
            attributes: ["name", "image", [sequelize.fn("concat", "http://localhost:", process.env.PORT, "/characters/",
                sequelize.col("Character.id")), "detail"]]

        })
            .then(characters => {
                res.status(200).json({ characters })
            })
            .catch(err => {
                res.status(500).json({ msg: "some error" })
            })
    },

    characterDetail: (req, res) => {

        Character.findOne({
            where: { id: req.params.id },
            include: {
                association: "MovieCharacter",
                attributes: ["tittle", "dateCreation", "calification", "image",
                    [sequelize.fn('concat', "http://localhost:", process.env.PORT, "/movies/", sequelize.col("movieid")), "detail"]]
            }
        })
            .then(character => {
                res.status(200).json(character)
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ msg: "some error" })
            })
    },

    addCharacter: (req, res) => {
        let character = {
            name: req.body.name,
            age: req.body.age,
            weigth: req.body.weigth,
            history: req.body.history,
            image: req.body.image
        }

        Character.create(character)
            .then(() => {
                res.status(201).json({ msg: "character created !" })
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ msg: "some error" })
            })
    },

    updateCharacter: async (req, res) => {
        let moviesInDb = []
        try {
            if (req.body.movies) {

                let movies = req.body.movies.split(",")
                for (let i = 0; i < movies.length; i++) {

                    await db.Movie.findOne({ where: { tittle: movies[i]} })
                        .then(movie => {
                            if (movie!=null){
                                moviesInDb.push(movie.dataValues)
                            }
                        })

                }

                for (let i = 0; i < moviesInDb.length; i++) {
                    
                    let movieMod = {
                        movieId: moviesInDb[i].id,
                        characterId: Number(req.params.id)
                    }
                    await MovieCharacter.create(movieMod)
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            let character = {
                name: req.body.name,
                age: req.body.age,
                weigth: req.body.weigth,
                history: req.body.history,
                image: req.body.image
            }
            Character.update(character, {
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    res.status(200).json({ msg: "character edited !" })
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ msg: "some error" })
                })
        }

    },

    deleteCharacter: (req, res) => {
        Character.destroy({ where: { id: req.params.id } })
            .then(() => {
                res.status(200).json({ msg: "character deleted !" })
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ msg: "some error" })
            })

    }
}

module.exports = characttersController