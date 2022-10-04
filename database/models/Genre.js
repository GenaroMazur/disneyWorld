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
        "createdAt":"create_at",
        "updatedAt":"update_at"
    }

    const Genre = sequelize.define(name, cols, config)
    
    Genre.associate = function ( models ) {
        Genre.belongsToMany(models.Movie, {
            "as":"genreMovie",
            "foreingKey":"idGenre",
            "otherKey":"idMovie",
            "through":"movies_Genres"
        })
    }
    return Genre
}