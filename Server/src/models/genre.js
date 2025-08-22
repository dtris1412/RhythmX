// models/Genre.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      Genre.belongsToMany(models.Song, {
        through: "song_genres",
        foreignKey: "genre_id",
        otherKey: "song_id",
      });
    }
  }
  Genre.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Genre",
      tableName: "genres",
      timestamps: false,
    }
  );
  return Genre;
};
