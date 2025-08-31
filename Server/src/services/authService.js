import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

const login = async (email, password) => {
  const user = await db.User.findOne({ where: { email } });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return null;
  // Tạo JWT
  const token = jwt.sign(
    { userId: user.user_id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return { user, token };
};

const register = async (username, email, password) => {
  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user
  const newUser = await db.User.create({
    username,
    email,
    password_hash: hashedPassword,
  });

  // tạo token (nếu cần)
  const token = jwt.sign(
    { userId: newUser.id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { user: newUser, token };
};

export { login, register };
