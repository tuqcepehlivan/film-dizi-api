'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    
    static associate(models) {
     
      Rating.belongsTo(models.User, { foreignKey: "userId" });
      Rating.belongsTo(models.Video, { foreignKey: "videoId" });
    }
  }
  Rating.init({
    userId: DataTypes.INTEGER,
    videoId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rating',
    timestamps: false

  });
  return Rating;
};