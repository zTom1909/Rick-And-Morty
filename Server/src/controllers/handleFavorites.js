const {
  getFavByIdHandler,
  postFavHandler,
  deleteFavFromUserHandler,
  addFavToUserHandler,
  getFavFromUserHandler,
} = require("../handlers/handleFavorites");

const getFav = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(401).json({ error: "Missing email" });

  try {
    const allFavs = await getFavFromUserHandler(email);
    res.status(200).json(allFavs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postFav = async (req, res) => {
  const { id, name, origin, status, image, species, gender } = req.body;
  const { email } = req.query;
  if (!id || !name || !origin || !status || !image || !species || !gender)
    return res
      .status(401)
      .json({ error: "Missing data while adding a character to favorites" });

  if (!email) return res.status(401).json({ error: "Missing email" });

  try {
    const charExists = await getFavByIdHandler(id);
    if (!charExists) {
      await postFavHandler({
        id,
        name,
        origin: origin.name,
        status,
        image,
        species,
        gender,
      });
    }

    const userFavorites = await addFavToUserHandler(email, id);

    res.status(200).json(userFavorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFav = async (req, res) => {
  const { id } = req.params;
  const { email } = req.query;
  if (id !== "*" && isNaN(id)) return res.status(400).json({ error: "Invalid id format" });
  if (!email) return res.status(401).json({ error: "Missing email" });
  try {
    const filteredFavs = await deleteFavFromUserHandler(email, id);
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
