// models/Payment.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Subscription, { foreignKey: "sub_id" });
    }
  }
  Payment.init(
    {
      provider: DataTypes.STRING,
      provider_txn_id: DataTypes.STRING,
      method: DataTypes.STRING,
      amount_cents: DataTypes.INTEGER,
      currency: DataTypes.STRING,
      status: DataTypes.ENUM("success", "pending", "failed", "refunded"),
      failure_reason: DataTypes.STRING,
      paid_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payments",
      timestamps: false,
    }
  );
  return Payment;
};
