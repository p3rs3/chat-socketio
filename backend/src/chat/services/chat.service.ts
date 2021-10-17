import { Injectable } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { RoomRepository } from '../repositories/room.repository';

@Injectable()
export class ChatService {
    constructor(
        private readonly roomRepository: RoomRepository,
    ){}

    getRoomClients(roomId: string): Client[] {
        return this.roomRepository.getRoomClients(roomId);
    }
}