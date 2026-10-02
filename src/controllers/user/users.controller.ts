import { Request, Response } from "express";
import { getProducts } from "services/client/item.service";
import {
  getAllRoles,
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
  handleViewUser,
} from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
  const products = await getProducts();
  return res.render("client/home/show.ejs", { products });
};

const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  return res.render("admin/user/create.ejs", { roles });
};

const postCreateUserPage = async (req: Request, res: Response) => {
  const { fullName, username, phone, role, address } = req.body;
  const file = req.file;
  const avatar = file?.filename ?? "";
  await handleCreateUser(fullName, username, address, phone, avatar, role);
  return res.redirect("/admin/user");
};

const deleteUserPage = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).send("Invalid user ID");
  }
  await handleDeleteUser(id);
  return res.redirect("/admin/user");
};

const viewUserPage = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).send("Invalid user ID");
  }
  const user = await handleViewUser(id);
  const roles = await getAllRoles();
  return res.render("admin/user/detail.ejs", { id, user, roles });
};

const updateUserPage = async (req: Request, res: Response) => {
  const { id, fullName, phone, role, address } = req.body;
  const file = req.file;
  const avatar = file?.filename ?? undefined;

  await handleUpdateUser(id, fullName, phone, role, address, avatar);
  return res.redirect("/admin/user");
};
export {
  getHomePage,
  getCreateUserPage,
  postCreateUserPage,
  deleteUserPage,
  viewUserPage,
  updateUserPage,
};
