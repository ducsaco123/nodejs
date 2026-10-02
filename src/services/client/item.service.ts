import { prisma } from "config/client";

const getProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const getProductById = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId) },
  });
  return product;
};

export { getProducts, getProductById };
