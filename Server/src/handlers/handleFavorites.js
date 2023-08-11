const { Favorite } = require("../db");

const getFavHandler = async () => {
  const allFavs = await Favorite.findAll();
  return allFavs;
};

const postFavHandler = async (character) => {
  await Favorite.create(character);
  const allFavorites = await Favorite.findAll();
  return allFavorites;
};

const deleteFavHandler = async (id) => {
  const characterToDelete = await Favorite.findByPk(id);
  if (!characterToDelete) throw Error("Character not found");
  await characterToDelete.destroy();
  const allFavorites = await Favorite.findAll();
  return allFavorites;
};

module.exports = {
  getFavHandler,
  postFavHandler,
  deleteFavHandler,
};
