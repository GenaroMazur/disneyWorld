module.exports = function ( sequelize, DataTypes) {
    let name = "Movie";
    let cols = {
        "tittle": {
            "type": DataTypes.STRING(45),
            "allowNull" : false
        },
        "dateCreation": {
            "type": DataTypes.DATE,
            "allowNull": false
        },
        "calification": {
            "type": DataTypes.INTEGER,
            "defaultValue":0
        },
        "image": {
            "type": DataTypes.STRING(60)
        }
    }
    let config = {
        "tableName":"movies",
        "createdAt":"create_at",
        "updatedAt":"update_at"
    }

    const Movie = sequelize.define(name, cols, config)

    Movie.assocciation = function ( models ) {
        Movie.belonsToMany(models.Character, {
            "as":"characterMovie",
            "foreingKey":"idMovie",
            "otherKey":"idCharacter",
            "through":"movies_character"
        })
        Movie.belonsToMany(models.Genre, {
            "as":"genreMovie",
            "foreingKey":"idMovie",
            "otherKey":"idGenre",
            "through":"movies_genres"
        })
    }
    return Movie
}