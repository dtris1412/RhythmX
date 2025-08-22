// models/Song.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    static associate(models) {
      Song.belongsTo(models.Artist, { foreignKey: "artist_id" });
      Song.belongsTo(models.Album, { foreignKey: "album_id" });
      Song.belongsToMany(models.Genre, {
        through: "song_genres",
        foreignKey: "song_id",
        otherKey: "genre_id",
      });
    }
  }
  Song.init(
    {
      title: DataTypes.STRING,
      duration_sec: DataTypes.INTEGER,
      explicit: DataTypes.BOOLEAN,
      cover_url: DataTypes.STRING,
      audio_url: DataTypes.STRING,
      source_type: DataTypes.ENUM("local", "external"),
      external_provider: DataTypes.STRING,
      external_id: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Song",
      tableName: "songs",
      timestamps: false,
    }
  );
  return Song;
};
