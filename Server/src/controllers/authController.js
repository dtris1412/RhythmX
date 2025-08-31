import {
  login as loginService,
  register as registerService,
} from "../services/authService.js";
const login = async (req, res) => {
  try {
    const { email, password_hash } = req.body;
    const result = await loginService(email, password_hash);
    if (!result) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  try {
    const result = await registerService(
      req.body.username,
      req.body.email,
      req.body.password_hash
    );
    res.status(201).json(result);
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json(error.message || { message: "Internal server error" });
  }
};

export { login, register };
