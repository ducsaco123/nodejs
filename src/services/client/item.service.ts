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

const getProductInCart = async (userId: number) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (cart) {
    const currentCardDetail = await prisma.cartDetail.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });
    return currentCardDetail;
  }
  return [];
};

const deleteCartDetail = async (
  id: number,
  userId: number,
  sumCart: number,
) => {
  const currentCardDetail = await prisma.cartDetail.delete({
    where: { id },
  });

  const quantity = currentCardDetail.quantity;
  if (sumCart === 1) {
    await prisma.cart.delete({
      where: { userId },
    });
  } else {
    await prisma.cart.update({
      where: { userId },
      data: {
        sum: {
          decrement: quantity,
        },
      },
    });
  }
};

const updateCartDetailBeforeCheckout = async (
  data: { id: string; quantity: string }[],
) => {
  for (let i = 0; i < data.length; i++) {
    await prisma.cartDetail.update({
      where: { id: +data[i].id },
      data: {
        quantity: +data[i].quantity,
      },
    });
  }
};

const handlePlaceOrder = async (
  userId: number,
  receiverName: string,
  receiverPhone: string,
  receiverAddress: string,
  totalPrice: number,
) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      cartDetails: true,
    },
  });

  if (cart) {
    //create order
    const dataOrderDetail =
      cart?.cartDetails?.map((item) => ({
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
      })) ?? [];
    await prisma.order.create({
      data: {
        receiverAddress,
        receiverName,
        receiverPhone,
        paymentMethod: "COD",
        paymentStatus: "PAYMENT_UNPAID",
        status: "PENDING",
        totalPrice,
        userId,
        orderDetails: {
          create: dataOrderDetail,
        },
      },
    });

    //remove cart detail + cart
    await prisma.cartDetail.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    //remove cart
    await prisma.cart.delete({
      where: { id: cart.id },
    });
  }
};

const getOrderHistory = async (userId: number) => {
  const history = await prisma.order.findMany({
    where: { userId },
    include: {
      orderDetails: {
        include: { product: true },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return history ?? [];
};
export {
  getProducts,
  getProductById,
  getProductToCart,
  getProductInCart,
  deleteCartDetail,
  updateCartDetailBeforeCheckout,
  handlePlaceOrder,
  getOrderHistory,
};
