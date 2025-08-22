// models/Report.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      Report.belongsTo(models.User, { foreignKey: "user_id" });
      Report.belongsTo(models.Song, { foreignKey: "song_id" });
    }
  }
  Report.init(
    {
      reason: DataTypes.TEXT,
      status: DataTypes.ENUM("pending", "reviewed", "rejected"),
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Report",
      tableName: "reports",
      timestamps: false,
    }
  );
  return Report;
};
