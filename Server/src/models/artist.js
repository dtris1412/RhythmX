// models/Artist.js
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
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
    }
  );
  return Artist;
};
