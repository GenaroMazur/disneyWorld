module.exports = function ( sequelize, DataTypes) {
    let name = "character";
    let cols = {
        "name": {
            "type": DataTypes.STRING(45),
            "allowNull" : false
        },
        "age": {
            "type": DataTypes.INTEGER,
            "allowNull": false
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
        "createdAt":"create_at",
        "updatedAt":"update_at"
    }

    const Character = sequelize.define(name, cols, config)

    return Character
}