import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserListItem from './UserListItem';
import DeleteConfirmation from './deleteConfirmation';

function UsersList() {
    const users = useSelector(state => state.users);
    const history = useHistory();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState();

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
       await axios.get('http://localhost:3001/api/users/')
            .then(response => {
                dispatch({
                    type: "AddAll",
                    payload: response.data
                });
            })
            .catch(() => {
                console.log('ERROR');
            });
    }

    function goToAddUser() {
        history.push("/user/add");
    }

    function onDelete(id) {
        setShowModal(true);
        setIdToDelete(id);
    }

    function handleDelete(id) {
        dispatch({
            type: "userRemoved",
            payload: {
                id
            }
        })
        hideModal();
    }

    function hideModal() {
        setShowModal(false);
    }

   function handleViewDetails(id) {
        return(
            history.push(`/users/${id}`)
        )
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
                            key={el._id}
                            id={el._id}
                            firstName={el.firstName}
                            lastName={el.lastName}
                            email={el.email}
                            password={el.password}
                            onDelete={onDelete}
                            onViewDetails={handleViewDetails}
                        />
                    })}
                </tbody>
            </table>
            <DeleteConfirmation show={showModal} hide={hideModal} id={idToDelete} onDelete={handleDelete}/>
        </div>
    )
}

export default UsersList;
