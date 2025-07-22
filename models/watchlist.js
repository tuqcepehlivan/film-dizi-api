'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WatchList extends Model {
    
    static associate(models) {
      
      WatchList.belongsTo(models.User, { foreignKey: "userId" });
      WatchList.belongsTo(models.Video, { foreignKey: "videoId" });
    }
  }
  WatchList.init({
    userId: DataTypes.INTEGER,
    videoId: DataTypes.INTEGER,
    status:  {
      type: DataTypes.ENUM("watched", "not_watched"),
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'WatchList',
    timestamps: false
  });
  return WatchList;
};