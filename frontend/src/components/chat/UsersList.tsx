import { UserListTitle, UserListWarpper } from './style';
import { UserItem } from './UserItem';

export const UsersList = ({users}: any) => {
    return (
        <UserListWarpper>
            <UserListTitle>
                Joined users
            </UserListTitle>
            {users.map((user: any) => {
                return (
                    <UserItem username={user.name}/>
                )
            })}
        </UserListWarpper>
    );
}