import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from "bcrypt";
import { comparePassword } from "services/user.service";

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

const handleLogin = async (
  username: string,
  password: string,
  callback: any,
) => {
  //Check user exist in DB
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    return callback(null, false, {
      message: `Username: ${username} not found`,
    });
  }
  //compare password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return callback(null, false, { message: `Invalid password` });
  }
  return callback(null, user);
};
export { handleCreateAccount, isEmailExist, handleLogin };
