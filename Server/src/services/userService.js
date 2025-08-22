import db from "../models/index.js";

const getAllUsers = async (req, res) => {
  return await db.User.findAll();
};

export { getAllUsers };
