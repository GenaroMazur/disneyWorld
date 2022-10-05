module.exports = function ( sequelize, DataTypes) {
    let name = "Genre";
    let cols = {
        "name": {
            "type": DataTypes.STRING(45),
            "allowNull" : false
        },
        "image": {
            "type": DataTypes.STRING(60)
        }
    }
    let config = {
        "tableName":"genres",
        "timestamps":false
    }

    const Genre = sequelize.define(name, cols, config)
    
    Genre.associate = function ( models ) {
        Genre.belongsToMany(models.Movie, {
            "as":"GenreMovie",
            "foreingKey":"genreId",
            "otherKey":"movieId",
            "through":"movies_genres",
            "timestamps":false
        })
    }
    return Genre
}