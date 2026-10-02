import { Request, Response } from "express";

const getLoginPage = async (req: Request, res: Response) => {
  return res.render("auth/login.ejs");
};

const getRegisterPage = async (req: Request, res: Response) => {
  return res.render("auth/register.ejs");
};

export { getLoginPage, getRegisterPage };
