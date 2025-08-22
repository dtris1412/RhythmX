import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      role: DataTypes.STRING,
      is_premium: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      freezeTableName: true,
      timestamps: false, // Nếu bạn không dùng createdAt/updatedAt mặc định
    }
  );
  return User;
};
