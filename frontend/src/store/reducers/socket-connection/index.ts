import { Socket } from "socket.io-client";
import { Message } from "../../../models/Message";
import { ConnectError } from "../../../models/ConnectError";
import { SocketConnectionAction, SocketConnectionActionEnum, SocketConnectionState } from "./types";

const initialState: SocketConnectionState = {
    socket: {} as Socket,
    username: '',
    room: '',
    isConnected: false,
    roomClients: [],
    messages: [] as Message[],
    connectError: {
        status: false,
        error: ''
    },
}

export default function socketConnectionReducer(state = initialState, action: SocketConnectionAction): SocketConnectionState {
    switch (action.type) {
        case SocketConnectionActionEnum.SET_SOCKET:
            return {...state, socket: action.payload}
        case SocketConnectionActionEnum.SET_USERNAME:
            return {...state, username: action.payload}
        case SocketConnectionActionEnum.SET_ROOM:
            return {...state, room: action.payload}
        case SocketConnectionActionEnum.SET_IS_CONNECTED:
            return {...state, isConnected: action.payload}
        case SocketConnectionActionEnum.SET_ROOM_CLIENTS:
            return {...state, roomClients: action.payload}
        case SocketConnectionActionEnum.ADD_MESSAGE:
            return {...state, messages: [...state.messages, action.payload]}
        case SocketConnectionActionEnum.SET_ERROR:
            return {...state, connectError: action.payload}
        default:
            return state;
    }
}