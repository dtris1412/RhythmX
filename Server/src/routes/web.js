import express from "express";
// import homeController from "../controllers/homeController.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/api/users", getAllUsers);

  return app.use("/", router);
};

export default initWebRoutes;
