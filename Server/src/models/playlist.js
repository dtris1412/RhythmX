// models/Playlist.js
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Playlist extends Model {
    static associate(models) {
      Playlist.belongsTo(models.User, { foreignKey: "owner_id" });
      Playlist.belongsToMany(models.Song, {
        through: "playlist_songs",
        foreignKey: "playlist_id",
        otherKey: "song_id",
      });
    }
  }
  Playlist.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      is_public: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Playlist",
      tableName: "playlists",
      timestamps: false,
    }
  );
  return Playlist;
};
