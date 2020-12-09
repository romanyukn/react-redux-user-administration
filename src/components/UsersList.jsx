import React from 'react';
import { useSelector } from 'react-redux';
import UserListItem from './UserListItem';

function UsersList() {
    const users = useSelector(state => state);
    console.log(users);
    
    return (
        <table className="table">
            <thead>
                <tr>
                <th scope="col">№</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                </tr>
            </thead>
            <tbody>
                {users.map((el) => {
                    <UserListItem 
                        key={el.id}
                        id={el.id}
                        firstName={el.firstName}
                        lastName={el.lastName}
                        email={el.email}
                        password={el.password}
                    />
                })}
            </tbody>
        </table>
    )
}

export default UsersList;