const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character/";

const getCharById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios(`${URL}${id}`);

    !data && res.status(404).json({ error: "Character not found" });

    res.json({
      id: Number(id),
      name: data.name,
      gender: data.gender,
      species: data.species,
      origin: data.origin,
      image: data.image,
      status: data.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCharById;
