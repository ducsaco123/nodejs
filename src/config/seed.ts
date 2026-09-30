import { hashPassword } from "services/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDatebase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();
  if (countUser === 0) {
    const defaultPassword = await hashPassword("123456");

    await prisma.user.createMany({
      data: [
        {
          username: "Saco@gmail.com",
          fullName: "Saco",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM,
          address: "Hà Nội",
        },
        {
          username: "admin@gmail.com",
          fullName: "admin",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM,
          address: "Hà Nội",
        },
      ],
    });
  } else if (countRole === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "ADMIN",
          description: "Admin thì full quyền",
        },
        {
          name: "USER",
          description: "User thông thường",
        },
      ],
    });
  } else {
    console.log("Already Data");
  }
};

export default initDatebase;
