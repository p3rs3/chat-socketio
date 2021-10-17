import { UserItemWarpper } from './style';

export const UserItem = ({username}: any) => {
    return (
        <UserItemWarpper>
            {username}
        </UserItemWarpper>
    );
}