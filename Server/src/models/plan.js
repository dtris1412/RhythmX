// models/Plan.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      Plan.hasMany(models.Subscription, { foreignKey: "plan_id" });
    }
  }
  Plan.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price_cents: DataTypes.INTEGER,
      currency: DataTypes.STRING,
      period_unit: DataTypes.ENUM("day", "month", "year"),
      period_count: DataTypes.INTEGER,
      features_json: DataTypes.JSON,
      is_active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Plan",
      tableName: "plans",
      timestamps: false,
    }
  );
  return Plan;
};
