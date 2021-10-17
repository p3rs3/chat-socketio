import { Client } from "./client.entity";

export class Room {
    clients: Client[] = [];
    id: string;

    constructor(id: string){
        this.id = id;
    }
}