import express, { Express } from "express";
import {
  deleteUserPage,
  getCreateUserPage,
  getHomePage,
  postCreateUserPage,
  updateUserPage,
  viewUserPage,
} from "controllers/user/users.controller";
import {
  getAdminOrderPage,
  getAdminProductPage,
  getAdminUserPage,
  getDashboardPage,
} from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";

const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);

  //admin routes
  router.get("/admin", getDashboardPage);

  router.get("/admin/user", getAdminUserPage);
  router.get("/admin/create-user", getCreateUserPage);
  router.post(
    "/admin/handle-create-user",
    fileUploadMiddleware("avatar"),
    postCreateUserPage,
  );
  router.post("/admin/handle-delete-user/:id", deleteUserPage);
  router.get("/admin/handle-view-user/:id", viewUserPage);
  router.post(
    "/admin/handle-update-user",
    fileUploadMiddleware("avatar"),
    updateUserPage,
  );

  router.get("/admin/order", getAdminOrderPage);
  router.get("/admin/product", getAdminProductPage);

  app.use("/", router);
};

export default webRoutes;
