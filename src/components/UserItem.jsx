import React from 'react';

function UserItem(props) {
    const userId = props.match.params.id;
    return (
        <div className="container mt-5">
            <ul class="list-group">
                <li class="list-group-item">{userId}</li>
            </ul>
        </div>
    )
}

export default UserItem;