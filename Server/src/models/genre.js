// models/Genre.js
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
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
