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

const getProductToCart = async (
  quantity: number,
  productId: number,
  user: Express.User,
) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (cart) {
    //update
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        sum: {
          increment: quantity,
        },
      },
    });

    //update + insert
    const currentCardDetail = await prisma.cartDetail.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });
    await prisma.cartDetail.upsert({
      where: {
        id: currentCardDetail?.id ?? 0,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        price: product?.price,
        quantity,
        productId,
        cartId: cart.id,
      },
    });
  } else {
    //create
    await prisma.cart.create({
      data: {
        sum: quantity,
        userId: user.id,
        cartDetails: {
          create: [
            {
              price: product?.price,
              quantity,
              productId,
            },
          ],
        },
      },
    });
  }
};

export { getProducts, getProductById, getProductToCart };
