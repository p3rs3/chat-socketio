import { AppDispatch } from '../..';
import { io, Socket } from '../../../../node_modules/socket.io-client';
import { SetIsConnectedAction, SetRoomAction, SetRoomClientsAction, SetSocketAction, SetUsernameAction, AddMessageAction, SocketConnectionActionEnum, SetConnectErrorAction } from './types';
import { Message } from '../../../models/Message';
import { ConnectError } from '../../../models/ConnectError';


export const SocketConnectionActionCreators = {
    setSocket: (socket: Socket): SetSocketAction => {
        return {
            type: SocketConnectionActionEnum.SET_SOCKET,
            payload: socket,
        }
    },
    setUsername: (username: string): SetUsernameAction => {
        return {
            type: SocketConnectionActionEnum.SET_USERNAME,
            payload: username,
        }
    },
    setRoom: (room: string): SetRoomAction => {
        return {
            type: SocketConnectionActionEnum.SET_ROOM,
            payload: room,
        }
    },
    setIsConnected: (isConnected: boolean): SetIsConnectedAction => {
        return {
            type: SocketConnectionActionEnum.SET_IS_CONNECTED,
            payload: isConnected,
        }
    },
    setRoomClients: (clients: object[]): SetRoomClientsAction => {
        return {
            type: SocketConnectionActionEnum.SET_ROOM_CLIENTS,
            payload: clients,
        }
    },
    addMessage: (message: Message): AddMessageAction => {
        return {
            type: SocketConnectionActionEnum.ADD_MESSAGE,
            payload: message,
        }
    },
    setConnectError: (error: ConnectError): SetConnectErrorAction => {
        return {
            type: SocketConnectionActionEnum.SET_ERROR,
            payload: error,
        }
    },
    setConnection: (username: string, room?: string) => (dispatch: AppDispatch) => {
        try {
            const socket = io('http://localhost:3000');

            socket.on('connect', () => {
                dispatch(SocketConnectionActionCreators.setSocket(socket));
                dispatch(SocketConnectionActionCreators.setUsername(username));

                socket.on('isError', (error: string) => {
                    dispatch(SocketConnectionActionCreators.setConnectError({
                        status: true,
                        error: error
                    }));
                });

                if (!room) {
                    socket.emit('onJoinNewRoom', {name: username});
                    socket.on('isJoined', (room) => {
                        dispatch(SocketConnectionActionCreators.setRoom(room));
                        dispatch(SocketConnectionActionCreators.setIsConnected(true));
                    });

                    socket.on('onRoomClientsChange', (clients) => {
                        dispatch(SocketConnectionActionCreators.setRoomClients(clients));
                    });

                    return;
                }

                socket.emit('onJoinRoom', {name: username, roomId: room});
                socket.on('isJoined', (room) => {
                    dispatch(SocketConnectionActionCreators.setIsConnected(true));
                });

                socket.on('onRoomClientsChange', (clients) => {
                    dispatch(SocketConnectionActionCreators.setRoomClients(clients));   
                });
            });
        } catch (e) {
            console.log('error');
        }
    }
}