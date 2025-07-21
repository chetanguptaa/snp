import { WebSocket } from "ws";

export class User {
  public socket: WebSocket;
  public id: string;

  constructor(socket: WebSocket, decoded: { id: string }) {
    this.socket = socket;
    this.id = decoded.id;
  }
}
