import axios, { AxiosResponse } from "axios";

export default class ClientService {
    static async getClients(roomId: string): Promise<AxiosResponse<any>> {
        return axios.get<string[]>(`http://localhost:3000/chat/${roomId}`);
    }
}