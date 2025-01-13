import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { OnEvent } from '@nestjs/event-emitter';
import { AppEventConstants, env } from '@monorepo/shared';
import { User } from '@prisma/client';

@WebSocketGateway({
  cors: {},
})
export class ListenerGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  connectedUsers: string[] = [];

  @OnEvent(AppEventConstants.USER_CREATED)
  handleNotification(user: User) {
    console.log('user created');
    // emit event to all connected users
    this.server.emit('new-user', user);

    // send notification to user
    const notification = {
      title: 'Welcome',
      body: `Welcome ${user.name}`,
    };
    this.sendNotification(user.id.toString(), notification);
  }

  async handleConnection(socket: Socket) {
    try {
      const response = await this.validate(socket);
      const { id } = response;
      socket.join(id);
      this.connectedUsers = [...this.connectedUsers, id];
      const onlineUsers = [...new Set(this.connectedUsers)];
      this.connectedUsers = onlineUsers;
      console.log('connected users', this.connectedUsers);
      this.server.emit('online-users', this.connectedUsers);
    } catch (error) {
      console.log('connection error', error);
    }
  }

  async handleDisconnect(socket) {
    try {
      const response = await this.validate(socket);
      const { id } = response;
      socket.leave(id);
      const userExist = this.connectedUsers.indexOf(id);

      if (userExist > -1) {
        this.connectedUsers = [
          ...this.connectedUsers.slice(0, userExist),
          ...this.connectedUsers.slice(userExist + 1),
        ];
      }
      const onlineUsers = [...new Set(this.connectedUsers)];
      this.connectedUsers = onlineUsers;

      console.log('connected users', this.connectedUsers);
      this.server.emit('online-users', this.connectedUsers);
    } catch (error) {
      console.log('disconnection error', error);
    }
  }

  async validate(socket: Socket): Promise<Record<string, any>> {
    const token: any = socket.handshake.query.token;
    console.log('connection request from user with token', token);
    if (!token) throw new WsException('Unauthorized');
    const tokendata: any = verify(token, env.jwtSecret);
    return tokendata;
  }

  sendNotification(userId: string, notification: any) {
    // send event to user
    this.server.to(userId).emit('notification', notification);

    // send push notification with firebase or similar service
  }
}
