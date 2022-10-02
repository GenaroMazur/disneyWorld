module.exports = function ( sequelize, DataTypes) {
    let name = "character";
    let cols = {
        "email": {
            "type": DataTypes.STRING(60),
            "allowNull" : false,
            "unique" : true
        },
        "password": {
            "type": DataTypes.STRING(15),
            "allowNull": false
        }
    }
    let config = {
        "createdAt":"create_at",
        "updatedAt":"update_at"
    }

    const Character = sequelize.define(name, cols, config)

    return Character
}