// models/Favorite.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: "user_id" });
      Favorite.belongsTo(models.Song, { foreignKey: "song_id" });
    }
  }
  Favorite.init(
    {
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Favorite",
      tableName: "favorites",
      timestamps: false,
    }
  );
  return Favorite;
};
