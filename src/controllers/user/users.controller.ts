import { Request, Response } from "express";
import {
  getAllRoles,
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
  handleViewUser,
} from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
  //get users
  const users = await getAllUsers();

  return res.render("home", {
    users,
  });
};

const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  return res.render("admin/user/create.ejs", { roles });
};

const postCreateUserPage = async (req: Request, res: Response) => {
  const { fullName, username, phone, role, address } = req.body;
  // await handleCreateUser(fullName, username, phone, role, address);
  return res.redirect("/admin/user");
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

const updateUserPage = async (req: Request, res: Response) => {
  const { id, fullName, email, address } = req.body;

  await handleUpdateUser(id, fullName, email, address);
  return res.redirect("/");
};
export {
  getHomePage,
  getCreateUserPage,
  postCreateUserPage,
  deleteUserPage,
  viewUserPage,
  updateUserPage,
};
