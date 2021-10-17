import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { ChatGateway } from './gateways/chat.gateway';
import { ClientRepository } from './repositories/client.repository';
import { RoomRepository } from './repositories/room.repository';
import { ChatService } from './services/chat.service';

@Module({
    imports: [],
    controllers: [ChatController],
    providers: [
        ChatGateway,
        ClientRepository,
        RoomRepository,
        ChatService
    ],
})
export class ChatModule {}
