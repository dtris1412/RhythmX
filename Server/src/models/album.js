// models/Album.js
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Album extends Model {
    static associate(models) {
      Album.belongsTo(models.Artist, { foreignKey: "artist_id" });
      Album.hasMany(models.Song, { foreignKey: "album_id" });
    }
  }
  Album.init(
    {
      title: DataTypes.STRING,
      release_date: DataTypes.DATE,
      cover_url: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Album",
    }
  );
  return Album;
};
