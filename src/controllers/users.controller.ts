import { Request, Response } from "express";
import {
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleViewUser,
} from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
  //get users
  const users = await getAllUsers();

  return res.render("home", {
    users,
  });
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create-user");
};

const postCreateUserPage = async (req: Request, res: Response) => {
  const { fullName, email, address } = req.body;
  await handleCreateUser(fullName, email, address);
  return res.redirect("/");
};

const deleteUserPage = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).send("Invalid user ID");
  }
  await handleDeleteUser(id);
  return res.redirect("/");
};

const viewUserPage = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).send("Invalid user ID");
  }
  const user = await handleViewUser(id);
  return res.render("view-user", { id, user });
};
export {
  getHomePage,
  getCreateUserPage,
  postCreateUserPage,
  deleteUserPage,
  viewUserPage,
};
