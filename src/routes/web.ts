import express, { Express } from "express";
import {
  getCreateUserPage,
  getHomePage,
  postCreateUserPage,
} from "../controllers/users.controller";

const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);

  router.get("/create-user", getCreateUserPage);

  router.post("/create-user", postCreateUserPage);

  app.use("/", router);
};

export default webRoutes;
