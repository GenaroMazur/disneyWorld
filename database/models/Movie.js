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
        timestamps:false
    }

    const Movie = sequelize.define(name, cols, config)

    Movie.associate = function ( models ) {
        Movie.belongsToMany(models.Character, {
            "through":"movies_characters",
            "foreingKey":"movieId",
            "otherKey":"characterId",
            "as":"MovieCharacter",
            timestamps:false
        })
        Movie.belongsToMany(models.Genre, {
            "through":"movies_genres",
            "foreingKey":"movieId",
            "otherKey":"genreId",
            "as":"MovieGenre",
            timestamps:false
        })
    }
    return Movie
}