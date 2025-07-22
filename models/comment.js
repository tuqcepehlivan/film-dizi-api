'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    static associate(models) {
      
      Comment.belongsTo(models.User, { foreignKey: "userId" });
      Comment.belongsTo(models.Video, { foreignKey: "videoId" });
    }
  }
  Comment.init({
    userId: DataTypes.INTEGER,
    videoId: DataTypes.INTEGER,
    text: DataTypes.content 
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
    createdAt: true,
    updatedAt: false
  });
  return Comment;
};