import { prisma } from "config/client";

const getAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const handleCreateProduct = async (
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
  image: string,
) => {
  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
      ...(image && { image }),
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
    },
  });
  return newProduct;
};

export { getAllProducts, handleCreateProduct };
