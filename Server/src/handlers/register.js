const { User } = require("../db");

module.exports = async (user) => {
  const newUser = await User.create(user);
  return newUser.dataValues;
};
