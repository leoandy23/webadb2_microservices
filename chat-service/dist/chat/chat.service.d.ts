interface Message {
    sender: string;
    content: string;
}
export declare class ChatService {
    private messages;
    saveMessage(message: Message): void;
    getMessages(): Message[];
}
export {};
