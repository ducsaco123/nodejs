import { hashPassword } from "services/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDatebase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();
  if (countRole === 0) {
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
  }
  if (countUser === 0) {
    const defaultPassword = await hashPassword("123456");
    const adminRole = await prisma.role.findFirst({
      where: { name: "ADMIN" },
    });
    if (adminRole) {
      await prisma.user.createMany({
        data: [
          {
            username: "Saco@gmail.com",
            fullName: "Saco",
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            address: "Hà Nội",
            roleId: adminRole.id,
          },
          {
            username: "admin@gmail.com",
            fullName: "admin",
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            address: "Hà Nội",
            roleId: adminRole.id,
          },
        ],
      });
    }
  }
  if (countRole !== 0 && countUser !== 0) {
    console.log("Already Data");
  }
};

export default initDatebase;
