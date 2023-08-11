const {
  getFavHandler,
  postFavHandler,
  deleteFavHandler,
} = require("../handlers/handleFavorites");

const getFav = async (req, res) => {
  try {
    const allFavs = await getFavHandler()
    res.status(200).json(allFavs) 
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const postFav = async (req, res) => {
  const { id, name, origin, status, image, species, gender } = req.body;
  if (!id || !name || !origin || !status || !image || !species || !gender)
    return res
      .status(401)
      .json({ error: "Missing data while adding a character to favorites" });

  try {
    const newFav = await postFavHandler({
      id,
      name,
      origin: origin.name,
      status,
      image,
      species,
      gender,
    });
    res.status(200).json(newFav);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFav = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id))
    return res.status(400).json({ error: "Invalid id format" });
  try {
    const filteredFavs = await deleteFavHandler(id);
    res.status(200).json(filteredFavs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFav,
  postFav,
  deleteFav,
};
