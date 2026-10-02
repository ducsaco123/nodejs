import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from "bcrypt";

const saltRounds = 10;
const hashPassword = async (plaintText: string) => {
  return await bcrypt.hash(plaintText, saltRounds);
};

const isEmailExist = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { username: email },
  });

  if (user) {
    return true;
  }
  return false;
};

const handleCreateAccount = async (
  fullName: string,
  username: string,
  password: string,
) => {
  password = await hashPassword(password);
  const userRole = await prisma.role.findUnique({
    where: { name: "USER" },
  });

  if (userRole) {
    await prisma.user.create({
      data: {
        fullName,
        username,
        password: password,
        accountType: ACCOUNT_TYPE.SYSTEM,
        roleId: userRole.id, //Default role is user
      },
    });
  } else {
    throw new Error("User role không tồn tại");
  }
};

export { handleCreateAccount, isEmailExist };
