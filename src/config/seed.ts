import { prisma } from "./client";

const initDatebase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();
  if (countUser === 0) {
    await prisma.user.createMany({
      data: [
        {
          username: "Saco",
          fullName: "Saco",
          password: "123456",
          accountType: "user",
          address: "Hà Nội",
        },
        {
          username: "admin",
          fullName: "admin",
          password: "123456",
          accountType: "admin",
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
