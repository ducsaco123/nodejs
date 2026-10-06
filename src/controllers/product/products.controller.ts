import { name } from "ejs";
import { Request, Response } from "express";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleUpdateProduct,
  handleViewProduct,
} from "services/admin/product.service";
import { getProductById, getProductToCart } from "services/client/item.service";
import { ProductSchema, TProductSchecma } from "src/validation/product.schema";

const factoryOptions = [
  { name: "Apple (MacBook)", value: "APPLE" },
  { name: "Asus", value: "ASUS" },
  { name: "Lenovo", value: "LENOVO" },
  { name: "Dell", value: "DELL" },
  { name: "LG", value: "LG" },
  { name: "Acer", value: "ACER" },
];

const targetOptions = [
  { name: "Gaming", value: "GAMING" },
  { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
  { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
  { name: "Mỏng nhẹ", value: "MONG-NHE" },
  { name: "Doanh nhân", value: "DOANH-NHAN" },
];

const getDetailProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    return res.status(400).send("Invalid product ID");
  }
  const product = await getProductById(id);
  return res.render("client/product/detail.ejs", { product });
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

const viewProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const errors = [];

  if (typeof id !== "string") {
    return res.status(400).send("Invalid product ID");
  }
  const product = await handleViewProduct(id);
  return res.render("admin/product/detail.ejs", {
    id,
    product,
    errors,
    factoryOptions,
    targetOptions,
  });
};

const updateProductPage = async (req: Request, res: Response) => {
  const { id, name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body as TProductSchecma;

  const validate = ProductSchema.safeParse(req.body);
  if (!validate.success) {
    //error
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map((err) => `${err.message} (${err.path[0]})`);
    const product = {
      id,
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
    };
    return res.render("admin/product/detail.ejs", {
      errors,
      product,
      factoryOptions,
      targetOptions,
    });
  }

  const file = req.file;
  const image = file?.filename ?? null;
  await handleUpdateProduct(
    id,
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

const deleteProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).send("Invalid product ID");
  }
  await handleDeleteProduct(id);
  return res.redirect("/admin/product");
};

const postAddProductToCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (user) {
    await getProductToCart(1, +id, user);
  } else {
    return res.redirect("/login");
  }
  return res.redirect("/");
};
export {
  getDetailProductPage,
  getCreateProductPage,
  postCreateProduct,
  viewProductPage,
  updateProductPage,
  deleteProductPage,
  postAddProductToCart,
};
