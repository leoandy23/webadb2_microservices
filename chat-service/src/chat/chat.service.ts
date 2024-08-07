import { Injectable } from '@nestjs/common';

interface Message {
  sender: string;
  content: string;
}

@Injectable()
export class ChatService {
  private messages: Message[] = [];

  saveMessage(message: Message) {
    this.messages.push(message);
  }

  getMessages(): Message[] {
    return this.messages;
  }
}
