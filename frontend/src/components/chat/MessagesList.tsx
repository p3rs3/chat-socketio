import { Messageitem } from "./MessageItem";
import { MessagesListWarpper } from "./style";

export const MessagesList = ({messages}: any) => {
    return (
        <MessagesListWarpper>
            {messages.map((message: any) => {
                return (
                    <Messageitem message={message}/>
                )
            })}
        </MessagesListWarpper>
    );
}