import { WebSocketServer, WebSocket } from "ws";
import url from "url";
import { extractAuthUser } from "./auth";
import prisma from "@repo/database";
import { User } from "./classes/User";

const wss = new WebSocketServer({ port: 8080 });

const userSockets = new Map<string, Set<WebSocket>>();

wss.on("connection", async function connection(ws: WebSocket, req: any) {
  let user: User | null = null;
  try {
    const token: string = url.parse(req.url, true).query.token as string;
    user = await extractAuthUser(token, ws);
    if (!user) {
      ws.send(JSON.stringify({ error: "You are not authorized" }));
      ws.close();
      return;
    }
    if (!userSockets.has(user.id)) {
      userSockets.set(user.id, new Set());
    }
    userSockets.get(user.id)?.add(ws);
    ws.on("message", async (message: string) => {
      try {
        console.log(message.toString());
        const data = JSON.parse(message);
        if (data.type === "SUBSCRIBE_ALL") {
          const friends = await prisma.friend.findMany({
            where: { userId: user?.id },
            include: {
              friend: true,
            },
          });
          const friendList = friends.map((f) => ({
            id: f.friend.id,
          }));
          ws.send(
            JSON.stringify({
              type: "SUBSCRIBED",
              friends: friendList,
            })
          );
        }
        if (data.type === "SEND_MESSAGE") {
          const { toUserId, content } = data;
          if (!toUserId || !content) {
            ws.send(JSON.stringify({ error: "Missing fields" }));
            return;
          }
          const newMessage = await prisma.message.create({
            data: {
              senderId: user?.id || "",
              receiverId: toUserId,
              content: content,
              sentAt: new Date(),
            },
          });
          const payload = {
            type: "MESSAGE",
            message: {
              id: newMessage.id,
              from: user?.id,
              to: toUserId,
              content: newMessage.content,
              sentAt: newMessage.sentAt,
            },
          };
          const recipientSockets = userSockets.get(toUserId);
          if (recipientSockets) {
            for (const socket of recipientSockets) {
              socket.send(JSON.stringify(payload));
            }
            await prisma.message.update({
              where: { id: newMessage.id },
              data: {
                delivered: true,
                deliveredAt: new Date(),
              },
            });
          }
          ws.send(JSON.stringify({ ...payload, selfEcho: true }));
        }
      } catch (err) {
        console.log("err ", err);

        ws.send(JSON.stringify({ error: "Invalid message format" }));
      }
    });
    ws.on("close", () => {
      const sockets = userSockets.get(user?.id || "");
      if (sockets) {
        sockets.delete(ws);
        if (sockets.size === 0) {
          userSockets.delete(user?.id || "");
        }
      }
    });
  } catch (error) {
    ws.send(JSON.stringify({ error: "You are not authorized" }));
    ws.close();
  }
});
