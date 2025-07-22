'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    
    static associate(models) {
      
      Favorite.belongsTo(models.User, { foreignKey: "userId" });  
      Favorite.belongsTo(models.Video, { foreignKey: "videoId" });  
    }
  }
  Favorite.init({
    userId: DataTypes.INTEGER,
    videoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
    timestamps: false
  });
  return Favorite;
};