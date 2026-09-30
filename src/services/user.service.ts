import getConnection from "config/database";
import { PrismaClient, Prisma } from "@prisma/client";
import { prisma } from "config/client";

const handleCreateUser = async (
  fullName: string,
  email: string,
  address: string,
) => {
  await prisma.user.create({
    data: {
      fullName,
      username: email,
      password: "",
      accountType: "",
      address,
    },
  });
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const handleDeleteUser = async (userId: string) => {
  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(userId) },
  });
  return deletedUser;
};

const handleViewUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });
  return user;
};

const handleUpdateUser = async (
  userId: string,
  fullName: string,
  email: string,
  address: string,
) => {
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {
      fullName,
      username: email,
      address,
      password: "",
      accountType: "",
    },
  });

  return updatedUser;
};

export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  handleViewUser,
  handleUpdateUser,
};
