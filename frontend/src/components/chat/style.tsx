import styled from 'styled-components';

export const ChatWrapper = styled.div`
    display: flex;
`;

export const UserListWarpper = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 15%;
    background-color: white;
    min-height: 100vh;
    padding: 30px;
`;

export const UserListTitle = styled.h2`
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 30px;
`;

export const MessagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    padding: 50px 0;
`

export const UserItemWarpper = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    width: 100%;    
    height: 50px;
    margin: 10px 0;
    font-size: 19px;
    box-shadow: 1px 1px 5px black;
    font-weight: 600;
    background-color: #4d518e;
    color: #FFF;
`;

export const MessagesListWarpper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    background-color: white;
    width: 80%;
    padding: 30px;
    height: 80vh;
    margin-bottom: 10px;
    overflow-y: scroll;
`;

export const ControllsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
`;

export const MessageItemTitle = styled.div`
    display: flex;
    color: #afafaf;
`;

export const MessageItemText = styled.div<{ isSelf: boolean }>`
    background-color: ${props => (props.isSelf ? '#d0e8d2' : '#80acc7')};
    padding: 10px;
    width: max-content;
    border-radius: 15px;
    color: ${props => (props.isSelf ? '#000' : '#fff')}
`;

export const MessageItemDate = styled.div`
`;

export const MessageItemUser = styled.div`
    margin-right: 20px;
    color: #767676;
    font-weight: 600;
`;

export const MessageItemWarpper = styled.div<{ isSelf: boolean }>`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    align-items: ${props => (props.isSelf ? 'end' : 'start')}
`;