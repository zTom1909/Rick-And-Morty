const updateLangHandler = require("../handlers/updateLang");

const updateLang = async (req, res) => {
  const { email, lang } = req.body;
  if (!email) return res.status(400).json({ error: "Missing email" });
  if (!lang) return res.status(400).json({ error: "Missing language" });

  try {
    const newLang = await updateLangHandler(email, lang);
    res.status(200).json(newLang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateLang;
