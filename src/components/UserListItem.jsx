import React from 'react';
import DeleteConfirmation from './deleteConfirmation';

function UserListItem(props) {
    const {id, firstName, lastName, email, password, onDelete, onViewDetails} = props;

    function deleteConfirmation() {
        return(
            <DeleteConfirmation id={id} onDelete={onDelete}/>
        )
    }

    return(
        <tr>
            <th scope="row">{id}</th>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td type="password">{password}</td>
            <button type="button" className="btn btn-success mt-2">Edit</button>
            <button type="button" className="btn btn-primary mr-2 ml-2 mt-2" onClick={() => onViewDetails(id)}>Details</button>
            <button type="button" className="btn btn-danger mt-2" onClick={deleteConfirmation}>Delete</button>
        </tr>
    )
}

export default UserListItem;