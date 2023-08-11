const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('User', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            isEmail: true
         }
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false
      },
      language: {
         type: DataTypes.ENUM("es", "en"),
         defaultValue: "es",
         allowNull: false
      }
   }, { timestamps: false });
};
