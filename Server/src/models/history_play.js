// models/HistoryPlay.js
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class History_Play extends Model {
    static associate(models) {
      History_Play.belongsTo(models.User, { foreignKey: "user_id" });
      History_Play.belongsTo(models.Song, { foreignKey: "song_id" });
    }
  }
  History_Play.init(
    {
      played_at: DataTypes.DATE,
      device: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "History_Play",
      tableName: "history_plays",
      timestamps: false,
    }
  );
  return History_Play;
};
