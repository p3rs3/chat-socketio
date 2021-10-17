import { Client } from "../entities/client.entity";
import { Room } from "../entities/room.entity";

export class RoomRepository {
    rooms: Room[] = [];

    setRoom(room: Room): void {
        this.rooms.push(room);
    }

    setRoomClient(room: Room, client: Client): void {
        this.rooms = this.rooms.map(r => {
            if (r.id === room.id) {
                r.clients.push({...client});
            }

            return r;
        });
    }

    deleteRoomClient(room: Room, client: Client): void {
        this.rooms = this.rooms.map(r => {
            if (r.id === room.id) {
                r.clients = r.clients.filter(c => c.id !== client.id);
            }

            return r;
        });
    }

    getRoomClients(roomId: string): Client[] {
        const room = this.getRoomById(roomId);
        return room.clients;
    }

    getRoomById(id: string): Room | null {
        const filteredRoom = this.rooms.filter(room => room.id === id);

        if (filteredRoom.length = 1) {
            return filteredRoom[0];
        }

        return null;
    }
}