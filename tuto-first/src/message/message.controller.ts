import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from 'src/models/messages.models';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {
    }

    @Get()
    async getMessages() {
        const data = await this.messageService.getMessages();
        return data;
    } 

    @Get(":id")
    async getMessage(@Param('id', ParseIntPipe) id: number): Promise<string> {
        const data = await this.messageService.getMessage(id);
        return data
    }

    @Post()
    async postMessage(@Body() body: MessageDto) {
        const data = await this.messageService.postMessage(body);
        return data;
    }

}
