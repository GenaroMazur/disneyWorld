module.exports = function ( sequelize, DataTypes) {
    let name = "Character";
    let cols = {
        "name": {
            "type": DataTypes.STRING(45),
            "allowNull" : false
        },
        "age": {
            "type": DataTypes.INTEGER
        },
        "weigth": {
            "type": DataTypes.INTEGER
        },
        "history": {
            "type": DataTypes.TEXT
        },
        "image": {
            "type": DataTypes.STRING(60)
        }
    }
    let config = {
        "tableName":"characters",
        "timestamps":false
    }

    const Character = sequelize.define(name, cols, config)

    Character.associate = function ( models ) {
        Character.belongsToMany(models.Movie, {
            "through":"movies_characters",
            "foreingKey":"characterId",
            "otherKey":"movieId",
            "as":"MovieCharacter",
            timestamps:false
        })
    }

    return Character
}