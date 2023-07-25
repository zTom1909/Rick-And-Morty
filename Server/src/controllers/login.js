const data = require("../utils/users");

const login = (req, res) => {
  const { email, password } = req.query;
  let access = false;

  data.forEach((user) => {
    if (user.email === email && user.password === password) access = true;
  });
  access ? res.json({ access: true }) : res.json({ access: false });
};

module.exports = login;
