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

    Movie.associate = function ( models ) {
        Movie.belongsToMany(models.Character, {
            "through":"movies_character",
            "foreingKey":"idMovie",
            "otherKey":"idCharacter",
            "as":"characterMovie"
        })
        Movie.belongsToMany(models.Genre, {
            "through":"movies_genres",
            "foreingKey":"idMovie",
            "otherKey":"idGenre",
            "as":"genreMovie"
        })
    }
    return Movie
}