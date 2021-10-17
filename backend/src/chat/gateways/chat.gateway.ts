import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { Room } from '../entities/room.entity';
import { Client } from '../entities/client.entity';
import { ClientRepository } from '../repositories/client.repository';
import { RoomRepository } from '../repositories/room.repository';

@WebSocketGateway(
    { 
        cors: {
            'origin': 'http://localhost:5000',
            'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
            'preflightContinue': false,
            'optionsSuccessStatus': 204,
            'credentials':true
        }   
    }
)
export class ChatGateway {
    constructor(
        private readonly roomRepository: RoomRepository,
        private readonly clientRepository: ClientRepository,
    ){}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('onMessage')
    onMessage(@ConnectedSocket() socket: Socket, @MessageBody() message: string): void {
        const client = this.clientRepository.getClientById(socket.id);

        this.server.to(client.room.id).emit('message', {
            date: Date.now(),
            user: client.name,
            text: message,
            userId: client.id
        });
    }

    @SubscribeMessage('onJoinRoom')
    onJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() {name, roomId}) {
        try {
            const room = this.roomRepository.getRoomById(roomId);

            this.connectToRoom(socket, name, room);
        } catch(error) {
            this.server.to(socket.id).emit('isError', error);
        }
        
    }

    @SubscribeMessage('onJoinNewRoom')
    onJoinNewRoom(@ConnectedSocket() socket: Socket, @MessageBody() { name }) {
        try {
            const room = new Room(uuidv4());
            this.roomRepository.setRoom(room);

            this.connectToRoom(socket, name, room);
        } catch(error) {
            this.server.to(socket.id).emit('isError', error);
        }
        
    }

    connectToRoom = (socket: Socket, clientName: string, room: Room) => {
        const client = new Client(socket.id, clientName);
        this.clientRepository.setClient(client);

        this.roomRepository.setRoomClient(room, client);
        this.clientRepository.setClientRoom(client, room);
        
        socket.join(room.id);
        const roomClients = this.roomRepository.getRoomClients(room.id);

        this.server.to(socket.id).emit('isJoined', room.id);
        this.server.to(room.id).emit('newSocket', client.name);
        this.server.to(room.id).emit('onRoomClientsChange', roomClients);
    }

    handleConnection(socket: Socket) {
        console.log(`client ${socket.id} connected`);
    }

    handleDisconnect(socket: Socket) {
        try {
            const client = this.clientRepository.getClientById(socket.id);
            const room = this.roomRepository.getRoomById(client.room.id);

            this.roomRepository.deleteRoomClient(room, client);
            const roomClients = this.roomRepository.getRoomClients(room.id);

            this.server.to(client.room.id).emit('isLeft', client.name);
            this.server.to(room.id).emit('onRoomClientsChange', roomClients);
        } catch(error) {
            console.log(error);
        }
    }
}



