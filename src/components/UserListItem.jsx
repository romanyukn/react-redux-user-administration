import React from 'react';

function UserListItem(props) {
    const {id, firstName, lastName, email, password} = props;
    return(
        <tr>
            <th scope="row">{id}</th>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{password}</td>
        </tr>
    )
}

export default UserListItem;