// models/Artist.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    static associate(models) {
      Artist.hasMany(models.Album, { foreignKey: "artist_id" });
      Artist.hasMany(models.Song, { foreignKey: "artist_id" });
    }
  }
  Artist.init(
    {
      name: DataTypes.STRING,
      bio: DataTypes.TEXT,
      avatar_url: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Artist",
      tableName: "artists",
      timestamps: false,
    }
  );
  return Artist;
};
