import { Client } from "../entities/client.entity";
import { Room } from "../entities/room.entity";

export class ClientRepository {
    clients: Client[] = [];

    setClient(client: Client) {
        this.clients.push(client);

        return client;
    }

    getClientById(id: string) {
        const filteredClients = this.clients.filter(client => client.id === id);

        if (filteredClients.length = 1) {
            return filteredClients[0];
        }

        return null;
    }

    setClientRoom(client: Client, room: Room) {
        this.clients = this.clients.map(c => {
            if (c.id === client.id) {
                c.room = {...room};
            }

            return c;
        });
    }
}