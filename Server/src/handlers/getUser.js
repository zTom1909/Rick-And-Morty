const { User, Favorite } = require("../db");

module.exports = async (email) => {
  const user = email
    ? User.findOne({
        where: { email },
        include: {
          model: Favorite,
          attributes: [
            "name",
            "status",
            "species",
            "origin",
            "image",
            "gender",
          ],
          through: {
            attributes: [],
          },
        },
      })
    : User.findAll({
        include: {
          model: Favorite,
          attributes: [
            "name",
            "status",
            "species",
            "origin",
            "image",
            "gender",
          ],
          through: {
            attributes: [],
          },
        },
      });
  return user;
};
