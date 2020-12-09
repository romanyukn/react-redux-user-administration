import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import UserListItem from './UserListItem';

function UsersList() {
    const users = useSelector(state => state);
    const history = useHistory();
    const dispatch = useDispatch();

    function goToAddUser() {
        history.push("/add-user");
    }

    function handleDelete(id) {
        console.log(id);
        dispatch({
            type: "userRemoved",
            payload: {
                id
            }
        })
    }
    
    return (
        <div className="container">
            <button type="button" className="btn btn-primary mb-3 mt-3" onClick={goToAddUser}>Add new user</button>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">№</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((el) => {
                        return <UserListItem 
                            key={el.id}
                            id={el.id}
                            firstName={el.firstName}
                            lastName={el.lastName}
                            email={el.email}
                            password={el.password}
                            onDelete={handleDelete}
                        />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UsersList;