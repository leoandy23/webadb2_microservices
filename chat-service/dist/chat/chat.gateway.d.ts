import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
export declare class ChatGateway {
    private chatService;
    private jwtService;
    server: Server;
    constructor(chatService: ChatService, jwtService: JwtService);
    handleConnection(client: Socket): void;
    handleMessage(message: {
        sender: string;
        content: string;
    }, client: Socket): void;
    handleJoin(username: string, client: Socket): void;
}
