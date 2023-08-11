const loginHandler = require("../handlers/login");

const login = async (req, res) => {
  const { email, password } = req.query;
  if (!email || !password)
    return res.status(400).json({ error: "Data missing at login" });
  try {
    const userFound = await loginHandler(email, password);
    res.status(200).json(userFound);
  } catch (error) {
    switch (error.message) {
      case "User not found":
        return res.status(404).json({ error: error.message });
      case "Wrong password":
        return res.status(403).json({ error: error.message });
      default:
        return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = login;
