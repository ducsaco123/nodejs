import express, { Express } from "express";
import {
  deleteUserPage,
  getCreateUserPage,
  getHomePage,
  postCreateUserPage,
} from "controllers/users.controller";

const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);

  router.get("/create-user", getCreateUserPage);

  router.post("/handle-create-user", postCreateUserPage);

  router.post("/handle-delete-user/:id", deleteUserPage);

  app.use("/", router);
};

export default webRoutes;
