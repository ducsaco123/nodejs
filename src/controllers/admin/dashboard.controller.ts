import { Request, Response } from "express";
import { getAllProducts } from "services/admin/product.service";
import { getAllUsers, handleCreateUser } from "services/user.service";

const getDashboardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard/dashboard.ejs");
};

const getAdminUserPage = async (req: Request, res: Response) => {
  const users = await getAllUsers();

  return res.render("admin/user/show.ejs", { users });
};

const getAdminProductPage = async (req: Request, res: Response) => {
  const products = await getAllProducts();
  return res.render("admin/product/show.ejs", { products });
};

const getAdminOrderPage = async (req: Request, res: Response) => {
  return res.render("admin/order/show.ejs");
};

export {
  getDashboardPage,
  getAdminUserPage,
  getAdminOrderPage,
  getAdminProductPage,
};
