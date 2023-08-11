const registerHandler = require("../handlers/register");

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Data missing at login" });

  try {
    const newUser = await registerHandler({email, password});
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = register;
