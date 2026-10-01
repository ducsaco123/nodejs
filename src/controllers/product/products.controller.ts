import { Request, Response } from "express";
// import { handleCreateProduct } from "services/product.service";
import { ProductSchema, TProductSchecma } from "src/validation/product.schema";

const getDetailProductPage = async (req: Request, res: Response) => {
  return res.render("client/product/detail.ejs");
};

const getCreateProductPage = async (req: Request, res: Response) => {
  return res.render("admin/product/create.ejs");
};

const postCreateProduct = async (req: Request, res: Response) => {
  const { name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body as TProductSchecma;
  try {
    const result = ProductSchema.parse(req.body);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  const file = req.file;
  const image = file?.filename ?? "";
  // await handleCreateProduct(
  //   name,
  //   price,
  //   detailDesc,
  //   shortDesc,
  //   quantity,
  //   factory,
  //   target,
  //   image,
  // );
  return res.redirect("/admin/product");
};

export { getDetailProductPage, getCreateProductPage, postCreateProduct };
