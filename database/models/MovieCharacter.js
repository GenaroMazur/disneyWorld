module.exports = function ( sequelize, DataTypes) {
    let name = "MovieCharacter";
    let cols = {
    }
    let config = {
        "tableName":"movies_characters",
        "timestamps":false
    }

    const MovieCharacter = sequelize.define(name, cols, config)

    MovieCharacter.associate = function(models){
        MovieCharacter.belongsTo(models.Movie,{
            "as":"movie",
            "foreingKey":"movieId"
        })
        MovieCharacter.belongsTo(models.Character,{
            "as":"character",
            "foreingKey":"characterId"
        })
    }
    return MovieCharacter
}