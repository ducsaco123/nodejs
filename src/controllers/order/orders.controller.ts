import { Request, Response } from "express";
import { handleViewOrder } from "services/admin/order.service";

const viewAdminOrderPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const errors = [];

  if (typeof id !== "string") {
    return res.status(400).send("Invalid order ID");
  }
  const order = await handleViewOrder(id);
  return res.render("admin/order/detail.ejs", {
    id,
    order,
    errors,
  });
};

export { viewAdminOrderPage };
