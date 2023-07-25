let myFavorites = [];

const getFav = (req, res) => {
  res.json(myFavorites);
};

const postFav = (req, res) => {
  const character = req.body;
  myFavorites.push(character);
  res.json(myFavorites);
};

const deleteFav = (req, res) => {
  const { id } = req.params;

  myFavorites =
    id === "*"
      ? []
      : myFavorites.filter((character) => character.id !== Number(id));
  res.json(myFavorites);
};

module.exports = {
  getFav,
  postFav,
  deleteFav,
};
