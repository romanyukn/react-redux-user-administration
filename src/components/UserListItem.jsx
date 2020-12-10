import React, { useState } from 'react';
import DeleteConfirmation from './deleteConfirmation';

function UserListItem(props) {
    const {id, firstName, lastName, email, password, onDelete, onViewDetails} = props;
    const [showModal, setShowModal] = useState(false);

    return(
        <div>
            <tr>
                <th scope="row">{id}</th>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td type="password">{password}</td>
                <button type="button" className="btn btn-success mt-2">Edit</button>
                <button type="button" className="btn btn-primary mr-2 ml-2 mt-2" onClick={() => onViewDetails(id)}>Details</button>
                <button type="button" className="btn btn-danger mt-2" onClick={setShowModal(true)}>Delete</button>
            </tr>
            {showModal && <DeleteConfirmation id={id} onDelete={onDelete}/>}
        </div>
    )
}

export default UserListItem;