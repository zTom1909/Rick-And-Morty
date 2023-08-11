const { User } = require("../db");

module.exports = async (email, password) => {
  const foundUser = await User.findOne({ where: { email } });
  if (!foundUser) throw new Error("User not found")
  if (password !== foundUser.password) throw new Error("Wrong password")
  return { access: true };
};
