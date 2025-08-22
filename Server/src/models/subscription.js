// models/Subscription.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      Subscription.belongsTo(models.User, { foreignKey: "user_id" });
      Subscription.belongsTo(models.Plan, { foreignKey: "plan_id" });
      Subscription.hasMany(models.Payment, { foreignKey: "sub_id" });
    }
  }
  Subscription.init(
    {
      status: DataTypes.ENUM("active", "expired", "canceled", "pending"),
      auto_renew: DataTypes.BOOLEAN,
      start_at: DataTypes.DATE,
      end_at: DataTypes.DATE,
      cancel_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Subscription",
      tableName: "subscriptions",
      timestamps: false,
    }
  );
  return Subscription;
};
