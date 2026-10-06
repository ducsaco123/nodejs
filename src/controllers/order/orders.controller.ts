import { NextFunction, Request, Response } from "express";

const getOrderDetailPage = async (req: Request, res: Response) => {
  const user = req.user;
  const { session } = req as any;
  const messages = session?.messages ?? [];
  return res.render("auth/login.ejs", { messages });
};

export { getOrderDetailPage };
