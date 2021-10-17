import moment from "moment";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { MessageItemDate, MessageItemText, MessageItemTitle, MessageItemUser, MessageItemWarpper } from "./style";

export const Messageitem = ({message}: any) => {
    const { socket } = useTypedSelector(state => state.socketConnectionReducer);
    const isSelf = socket.id === message.userId;

    return (
        <MessageItemWarpper isSelf={isSelf}>    
            <MessageItemTitle>
                <MessageItemUser>
                    {message.user}
                </MessageItemUser>
                <MessageItemDate>
                    {moment.unix(message.date / 1000).format('MMMM Do YYYY, h:mm:ss a')}
                </MessageItemDate> 
            </MessageItemTitle>
            <MessageItemText isSelf={isSelf}>
                {message.text}
            </MessageItemText>
        </MessageItemWarpper> 
    );
}