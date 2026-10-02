import { name } from "ejs";
import { Request, Response } from "express";
import { handleCreateProduct } from "services/admin/product.service";
import { ProductSchema, TProductSchecma } from "src/validation/product.schema";

const getDetailProductPage = async (req: Request, res: Response) => {
  return res.render("client/product/detail.ejs");
};

const getCreateProductPage = async (req: Request, res: Response) => {
  const errors = [];
  const oldData = {
    name: "",
    price: "",
    detailDesc: "",
    shortDesc: "",
    quantity: "",
    factory: "",
    target: "",
  };
  return res.render("admin/product/create.ejs", { errors, oldData });
};

const postCreateProduct = async (req: Request, res: Response) => {
  const { name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body as TProductSchecma;

  const validate = ProductSchema.safeParse(req.body);
  if (!validate.success) {
    //error
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map((err) => `${err.message} (${err.path[0]})`);
    const oldData = {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
    };
    return res.render("admin/product/create.ejs", { errors, oldData });
  }

  //success

  const file = req.file;
  const image = file?.filename ?? null;

  await handleCreateProduct(
    name,
    +price,
    detailDesc,
    shortDesc,
    +quantity,
    factory,
    target,
    image,
  );
  return res.redirect("/admin/product");
};

export { getDetailProductPage, getCreateProductPage, postCreateProduct };
