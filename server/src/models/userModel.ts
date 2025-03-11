import prisma from "../_core/database";

export const userModel = {
  createUser: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const user = await prisma.users.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });
      return user;
    } catch (error: Error | any) {
      throw new Error(error);
    }
  },
};
