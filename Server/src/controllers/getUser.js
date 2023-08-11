const getUserHandler = require("../handlers/getUser")

const getUser = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await getUserHandler(email)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

module.exports = getUser;
