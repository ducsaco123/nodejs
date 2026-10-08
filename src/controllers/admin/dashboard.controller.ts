import { Request, Response } from "express";
import { getDashboardInfo } from "services/admin/dashboard.service";
import { getAllOrders } from "services/admin/order.service";
import { getAllProducts } from "services/admin/product.service";
import {
  countTotalUserPages,
  getAllUsers,
  handleCreateUser,
} from "services/user.service";

const getDashboardPage = async (req: Request, res: Response) => {
  const info = await getDashboardInfo();
  return res.render("admin/dashboard/dashboard.ejs", { info });
};

const getAdminUserPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;
  const users = await getAllUsers(currentPage);
  const totalPages = await countTotalUserPages();
  return res.render("admin/user/show.ejs", {
    users,
    totalPages: +totalPages,
    page: +page,
  });
};

const getAdminProductPage = async (req: Request, res: Response) => {
  const products = await getAllProducts();
  return res.render("admin/product/show.ejs", { products });
};

const getAdminOrderPage = async (req: Request, res: Response) => {
  const orders = await getAllOrders();

  return res.render("admin/order/show.ejs", { orders });
};

export {
  getDashboardPage,
  getAdminUserPage,
  getAdminOrderPage,
  getAdminProductPage,
};
