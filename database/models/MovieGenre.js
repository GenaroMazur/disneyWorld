module.exports = function ( sequelize, DataTypes) {
    let name = "MovieGenre";
    let cols = {
    }
    let config = {
        "tableName":"movies_genres",
        "timestamps":false
    }

    const MovieGenre = sequelize.define(name, cols, config)

    MovieGenre.associate = function(models){
        MovieGenre.belongsTo(models.Movie,{
            "as":"movie",
            "foreingKey":"movieId"
        })
        MovieGenre.belongsTo(models.Genre,{
            "as":"genre",
            "foreingKey":"genreId"
        })
    }
    return MovieGenre
}