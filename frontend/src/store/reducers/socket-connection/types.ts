import { Socket } from "socket.io-client";
import { ConnectError } from "../../../models/ConnectError";
import { Message } from "../../../models/Message";

export interface SocketConnectionState {
    socket: Socket;
    username: string;
    room: string;
    isConnected: boolean;
    roomClients: object[];
    messages: Message[];
    connectError: ConnectError;
}

export enum SocketConnectionActionEnum {
    SET_SOCKET = 'SET_SOCKET',
    SET_USERNAME = 'SET_USERNAME',
    SET_ROOM = 'SET_ROOM',
    SET_IS_CONNECTED = 'SET_IS_CONNECTED',
    SET_ROOM_CLIENTS = 'SET_ROOM_CLIENTS',
    ADD_MESSAGE = 'ADD_MESSAGE',
    SET_ERROR = 'SET_ERROR',

}

export interface SetSocketAction {
    type: SocketConnectionActionEnum.SET_SOCKET;
    payload: Socket;
}

export interface SetUsernameAction {
    type: SocketConnectionActionEnum.SET_USERNAME;
    payload: string;
}

export interface SetRoomAction {
    type: SocketConnectionActionEnum.SET_ROOM;
    payload: string;
}

export interface SetIsConnectedAction {
    type: SocketConnectionActionEnum.SET_IS_CONNECTED;
    payload: boolean;
}

export interface SetRoomClientsAction {
    type: SocketConnectionActionEnum.SET_ROOM_CLIENTS;
    payload: object[];
}

export interface AddMessageAction {
    type: SocketConnectionActionEnum.ADD_MESSAGE;
    payload: Message;
}

export interface SetConnectErrorAction {
    type: SocketConnectionActionEnum.SET_ERROR;
    payload: ConnectError;
}

export type SocketConnectionAction = 
    SetSocketAction |
    SetUsernameAction |
    SetRoomAction |
    SetIsConnectedAction |
    SetRoomClientsAction |
    AddMessageAction |
    SetConnectErrorAction
;