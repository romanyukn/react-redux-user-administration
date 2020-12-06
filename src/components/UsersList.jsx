import React from 'react';
import store from '..store/';
import UserListItem from './UserListItem';

store.dispatch({
    type: "userAdded",
    payload: {
        firstName: "Harry",
        lastName: "Potter",
        email: "harry@gmail.com",
        password: "1234"
    }
})
console.log(store.getState());

function UsersList() {
    return (
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                </tr>
            </thead>
            <tbody>
                {state.map((el) => {
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