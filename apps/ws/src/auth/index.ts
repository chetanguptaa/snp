import { config } from "dotenv";
config();
import prisma from "@repo/database";
import jwt from "jsonwebtoken";
import { WebSocket } from "ws";
import { User } from "../classes/User";

const JWT_SECRET = process.env.JWT_SECRET!;

export const extractAuthUser = async (token: string, ws: WebSocket) => {
  const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
  if (decoded.sub) {
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.sub,
      },
    });
    if (!user) return null;
    return new User(ws, {
      id: decoded.sub,
    });
  }
  return null;
};
