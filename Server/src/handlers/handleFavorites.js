const { Favorite, User } = require("../db");

const getFavByIdHandler = async (id) => {
  const favCharacter = await Favorite.findByPk(id);
  return favCharacter;
};

const postFavHandler = async (character) => {
  await Favorite.create(character);
  const allFavorites = await Favorite.findAll();
  return allFavorites;
};

const getFavFromUserHandler = async (email) => {
  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Favorite,
        attributes: [
          "id",
          "name",
          "status",
          "species",
          "origin",
          "image",
          "gender",
        ],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return user.Favorites;
};

const addFavToUserHandler = async (email, id) => {
  const oldUser = await User.findOne({ where: { email } });
  await oldUser.addFavorites([id]);

  const newUser = await User.findOne({
    where: { email },
    include: [
      {
        model: Favorite,
        attributes: [
          "id",
          "name",
          "status",
          "species",
          "origin",
          "image",
          "gender",
        ],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return newUser.Favorites;
};

const deleteFavFromUserHandler = async (email, id) => {
  const oldUser = await User.findOne({ where: { email } });
  if (id === "*") await oldUser.setFavorites([]);
  else await oldUser.removeFavorites([id]);

  const newUser = await User.findOne({
    where: { email },
    include: [
      {
        model: Favorite,
        attributes: [
          "id",
          "name",
          "status",
          "species",
          "origin",
          "image",
          "gender",
        ],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return newUser.Favorites;
};

module.exports = {
  getFavByIdHandler,
  postFavHandler,
  deleteFavFromUserHandler,
  addFavToUserHandler,
  getFavFromUserHandler,
};
