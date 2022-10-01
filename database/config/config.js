module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "disneyWorld",
    "host": "localhost:3066",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.userDb,
    "password": process.env.passDb,
    "database": process.env.databaseName,
    "host": process.env.hostDb,
    "dialect": "mysql"
  }
}
