import { Room } from "./room.entity";

export class Client {
    id: string;
    name: string;
    room: Room;

    constructor(id: string, name: string){
        this.id = id;
        this.name = name;
    }
}