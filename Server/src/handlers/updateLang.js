const { User } = require("../db");

module.exports = async (email, lang) => {
  await User.update({ language: lang }, { where: { email } });
  const user = await User.findOne({ where: { email } });
  return user;
};
