import express from "express";
// import homeController from "../controllers/homeController.js";
// import userController from "../controllers/userController.js";

const router = express.Router();

const initWebRoutes = (app) => {
  // GET HOME PAGE
  //   router.get("/", homeController.getHomePage);
  //   router.get("/crud", homeController.getCRUD);
  //   router.post("/post-crud", homeController.postCRUD);
  //   router.get("/get-crud", homeController.displayGetCRUD);
  //   router.get("/edit-crud", homeController.getEditCRUD);
  //   router.post("/put-crud", homeController.putCRUD);
  //   router.get("/delete-crud", homeController.deleteCRUD);

  //   router.post("/api/login", userController.handleLogin);

  return app.use("/", router);
};

export default initWebRoutes;
