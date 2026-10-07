import { prisma } from "config/client";

const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    include: { user: true },
  });
  return orders;
};

const handleViewOrder = async (orderId: string) => {
  const id = parseInt(orderId);
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      orderDetails: {
        include: {
          product: true,
        },
      },
    },
  });

  if (order) return order;

  // Fallback if accessed via orderDetail ID
  const orderDetail = await prisma.orderDetail.findUnique({
    where: { id },
    include: {
      product: true,
      order: {
        include: { user: true },
      },
    },
  });
  return orderDetail;
};
export { getAllOrders, handleViewOrder };
