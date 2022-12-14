module.exports = function ( sequelize, DataTypes) {
    let name = "User";
    let cols = {
        "email": {
            "type": DataTypes.STRING(60),
            "allowNull" : false,
            "unique" : true
        },
        "password": {
            "type": DataTypes.STRING(60),
            "allowNull": false
        },
        "status": {
            "type": DataTypes.STRING(15),
            "defaultValue": "guest"
        }
    }
    let config = {
        "tableName":"users",
        "createdAt":"create_at",
        "updatedAt":"update_at"
    }

    const User = sequelize.define(name, cols, config)

    return User
}