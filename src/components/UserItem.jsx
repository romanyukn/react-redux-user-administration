import React from 'react';
import { useSelector } from 'react-redux';
import AddUserForm from './AddUserForm';

function UserItem(props) {
    const userId = Number(props.match.params.id);
    const selectedUser = useSelector(state => state.find(el => el.id === userId));
    const formFields = Object.keys(selectedUser).reduce((accu, fieldName) => 
        {if(fieldName === "id" || fieldName === "isDelete") {
            return accu;
        } else {
            return [...accu, {name: fieldName, value: selectedUser[fieldName], isValid: true, className: "form-control", error: ""}]
        }}
       ,[]);

    return (
        <AddUserForm fields={formFields} mode="Edit"/>
    )
}

export default UserItem;