import React from 'react';

function UserListItem(props) {
    const {id, firstName, lastName, email, password, onDelete, onViewDetails} = props;

    return(
        <tr>
            <th scope="row"></th>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <button type="button" className="btn btn-primary mr-2 ml-2 mt-2" onClick={() => onViewDetails(id)}>Details</button>
            <button type="button" className="btn btn-danger mt-2" onClick={() => onDelete(id)}>Delete</button>
        </tr>
    )
}

export default UserListItem;
