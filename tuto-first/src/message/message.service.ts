import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/models/messages.models';

@Injectable()
export class MessageService {

    async getMessages(): Promise<string> {
        return "tous les messages";
    }

    async getMessage(id: number): Promise<string> {
        return "message avec id: " + id;
    }

    async postMessage(body: MessageDto): Promise<string> {
        const { userId, userName, title, content } = body;
        return "message posté avec le content: " + content;
    }
}
