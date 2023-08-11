require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const UserModel = require("./models/User");
const FavoriteModel = require("./models/Favorite");

const URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const database = new Sequelize(URL, { logging: false, native: false });

UserModel(database);
FavoriteModel(database);

const { User, Favorite } = database.models;
User.belongsToMany(Favorite, { through: "UserFavorite" })
Favorite.belongsToMany(User, { through: "UserFavorite" })

module.exports = {
  database,
  ...database.models,
};
