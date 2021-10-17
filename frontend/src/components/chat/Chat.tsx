import { useEffect } from "react";
import { ChatWrapper, MessagesWrapper, ControllsWrapper } from './style';
import ClientService from "../../api/ClientService";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { UsersList } from "./UsersList";
import { useHistory } from "react-router";
import { RouteNames } from "../../router";
import { useQuery } from "../../hooks/useQuery";
import { useActions } from "../../hooks/useActions";
import { Button, message } from "antd";
import { Message } from "../../models/Message";
import { MessagesList } from "./MessagesList";
import { MessageInput } from "./MessageInput";

export const Chat = () => {
    const { setRoom, setRoomClients, addMessage } = useActions();
    const { room, isConnected, roomClients, socket, messages } = useTypedSelector(state => state.socketConnectionReducer);
    const history = useHistory();
    const query = useQuery();
    const roomParam = query.get('room');

    useEffect(() => {
        if (room) {
            (async () => {
                const response = await ClientService.getClients(room);
                const clients = response.data;
                setRoomClients(clients);
            })();

            socket.on('message', (message: Message) => {
                addMessage(message);
            });

            socket.on('isLeft', (clientName: string) => {
                message.info(`${clientName} has left`);
            });

            socket.on('newSocket', (clientName: string) => {
                message.info(`${clientName} has joined`);
            });

            return;
        };

        if (roomParam) {
            setRoom(roomParam);
            history.push(RouteNames.JOIN + `?room=${roomParam}`);

            return;
        }

        history.push(RouteNames.JOIN);
    }, [isConnected]);

    const onClickCopyButton = () => {
        navigator.clipboard.writeText(`http://localhost:5000/room?room=${room}`);
        message.success('Link copied to clipboard');
    }

    return (
        <ChatWrapper>
            <UsersList users={roomClients}/>
            <MessagesWrapper>
                <MessagesList messages={messages} />
                <ControllsWrapper>
                    <MessageInput />
                    <Button onClick={onClickCopyButton}>Get link for invite</Button>
                </ControllsWrapper>
            </MessagesWrapper>
        </ChatWrapper>
    );
}