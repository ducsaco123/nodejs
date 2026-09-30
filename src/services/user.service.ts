import { PrismaClient, Prisma } from "@prisma/client";
import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";

const handleCreateUser = async (
  fullName: string,
  username: string,
  address: string,
  phone: string,
  avatar: string,
) => {
  await prisma.user.create({
    data: {
      fullName,
      username,
      password: "123456",
      accountType: ACCOUNT_TYPE.SYSTEM,
      address,
      phone,
      avatar,
    },
  });
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getAllRoles = async () => {
  const roles = await prisma.role.findMany();
  return roles;
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
  getAllRoles,
};
