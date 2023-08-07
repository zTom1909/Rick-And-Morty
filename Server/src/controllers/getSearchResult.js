const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character/";

const getSearchResult = async (req, res) => {
  const query = req.query;
  const { id, name, status, species, type, gender } = query;

  try {
    if (id) {
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
    } else if (Object.keys(query).length) {
      let queryURL = URL + "?";

      if (name) queryURL += `name=${name}&`;
      if (status) queryURL += `status=${status}&`;
      if (species) queryURL += `species=${species}&`;
      if (type) queryURL += `type=${type}&`;
      if (gender) queryURL += `gender=${gender}&`;

      try {
        const { data: { results } } = await axios(queryURL);
        res.json(results.slice(0, 5))
      } catch (e) {
        return res.status(404).json({ error: "Character not found" });
      }
      
    } else res.status(404).json({ error: "No entries specified" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getSearchResult;
