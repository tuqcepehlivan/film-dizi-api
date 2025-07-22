'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    
    static associate(models) {
      
      Video.belongsTo(models.Category, { foreignKey: "categoryId" });
      Video.hasMany(models.Comment, { foreignKey: "videoId"});
      Video.hasMany(models.WatchList, { foreignKey: "videoId"});
      Video.hasMany(models.Rating, { foreignKey: "videoId"});
      Video.hasMany(models.Favorite, { foreignKey: "videoId" });
    }
  }
  Video.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imdb_score: DataTypes.FLOAT,
    director: DataTypes.STRING,
    release_date: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    thumbnail_path: DataTypes.STRING,
    video_path: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Video',
    timestamps: true
  });
  return Video;
};