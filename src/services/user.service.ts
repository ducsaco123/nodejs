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
      name: fullName,
      email,
      address,
    },
  });
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const handleDeleteUser = async (userId: string) => {
  try {
    const connection = await getConnection();
    const sql = "DELETE FROM `users` WHERE `id` = ?";
    const values = [userId];
    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const handleViewUser = async (userId: string) => {
  try {
    const connection = await getConnection();
    const sql = "SELECT * FROM `users` WHERE `id` = ?";
    const values = [userId];
    const [result, fields] = await connection.execute(sql, values);

    return result[0];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const handleUpdateUser = async (
  userId: string,
  fullName: string,
  email: string,
  address: string,
) => {
  try {
    const connection = await getConnection();
    const sql =
      "UPDATE `users` SET `name` = ?, `email` = ?, `address` = ? WHERE `id` = ?";
    const values = [fullName, email, address, userId];
    const [result, fields] = await connection.execute(sql, values);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  handleViewUser,
  handleUpdateUser,
};
