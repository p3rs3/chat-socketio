import { Controller, Get, Param } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { ChatService } from '../services/chat.service';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService){}

    @Get(':room')
    getRoomClients(@Param('room') roomId: string): Client[] {
        return this.chatService.getRoomClients(roomId)
    }
}
