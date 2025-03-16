import jwt from "jsonwebtoken";
import prisma from "../_core/database";

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

interface UserPayload {
  userId: number;
  posId: number | null;
}

export const generateTokens = async (user: UserPayload) => {
  const accessToken = jwt.sign({ user }, process.env.JWT_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  await prisma.refreshToken.upsert({
    where: { userId: user.userId },
    update: {
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    create: {
      userId: user.userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken, refreshToken };
};
