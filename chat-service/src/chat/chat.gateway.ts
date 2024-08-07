import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private chatService: ChatService,
    private jwtService: JwtService,
  ) {}

  @SubscribeMessage('connect')
  handleConnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.query.token as string;
    if (!token) {
      client.disconnect();
      return;
    }

    try {
      const payload = this.jwtService.verify(token);
      client.data.user = payload;
      client.emit('connection', 'Successfully connected to the chat');
    } catch (error) {
      client.disconnect();
    }
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: { sender: string; content: string },
    @ConnectedSocket() client: Socket,
  ): void {
    this.chatService.saveMessage(message);
    this.server.emit('message', message);
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join('chatroom');
    this.server.to('chatroom').emit('userJoined', username);
  }
}
