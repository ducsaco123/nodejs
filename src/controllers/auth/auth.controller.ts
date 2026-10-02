import { Request, Response } from "express";
import { handleCreateAccount } from "services/auth/auth.service";
import { handleCreateUser } from "services/user.service";
import {
  registerSchema,
  TRegisterSchema,
} from "src/validation/register.schema";

const getLoginPage = async (req: Request, res: Response) => {
  return res.render("auth/login.ejs");
};

const getRegisterPage = async (req: Request, res: Response) => {
  return res.render("auth/register.ejs");
};

const createAccount = async (req: Request, res: Response) => {
  const { fullName, username, password, confirmPassword } =
    req.body as TRegisterSchema;
  const validate = await registerSchema.safeParseAsync(req.body);
  if (!validate.success) {
    //error
    const errorZod = validate.error.issues;
    const errors = errorZod?.map((err) => `${err.message} (${err.path[0]})`);

    const oldData = {
      fullName,
      username,
      password,
      confirmPassword,
    };
    return res.render("auth/register.ejs", { errors, oldData });
  }

  //success
  await handleCreateAccount(fullName, username, password);
  return res.redirect("/login");
};

export { getLoginPage, getRegisterPage, createAccount };
