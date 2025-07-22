'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Comment, {foreignKey: "userId" });
      User.hasMany(models.WatchList, { foreignKey: "userId"});
      User.hasMany(models.Rating, { foreignKey: "userId" });
      User.hasMany(models.Favorite, { foreignKey: "userId" });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
  });
  return User;
};