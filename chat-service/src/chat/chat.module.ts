// src/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || '1234567890123456', // Use a real secret in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
