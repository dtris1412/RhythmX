import express from "express";
// import homeController from "../controllers/homeController.js";
import { getAllUsers } from "../controllers/userController.js";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/api/users", getAllUsers);
  router.post("/api/login", login);
  router.post("/api/register", register);
  return app.use("/", router);
};

export default initWebRoutes;
