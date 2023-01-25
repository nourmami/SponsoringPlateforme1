import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('messages')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

  sendMessage(message: string) {
    this.server.emit('messages', message);
  }

  afterInit(server) {
    console.log('Hiiiiiiiiiiiiiii, I am here');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected', client.id);
  }
}
