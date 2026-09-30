import { prisma } from "./client";

const initDatebase = async () => {
  const count = await prisma.user.count();
  if (count === 0) {
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
  } else {
    console.log("Already Data");
  }
};

export default initDatebase;
