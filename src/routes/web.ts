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
  getAdminUserPage,
  getDashboardPage,
} from "controllers/admin/dashboard.controller";

const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);

  router.get("/create-user", getCreateUserPage);

  router.post("/handle-create-user", postCreateUserPage);

  router.post("/handle-delete-user/:id", deleteUserPage);

  router.get("/handle-view-user/:id", viewUserPage);

  router.post("/handle-update-user", updateUserPage);

  //admin routes
  router.get("/admin", getDashboardPage);
  router.get("/admin/user", getAdminUserPage);

  app.use("/", router);
};

export default webRoutes;
