// models/Comment.js
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: "user_id" });
      Comment.belongsTo(models.Song, { foreignKey: "song_id" });
    }
  }
  Comment.init(
    {
      content: DataTypes.TEXT,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
