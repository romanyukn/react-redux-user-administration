import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddUserForm from './AddUserForm';

function UserItem(props) {
    const [mode, setMode] = useState("View");
    const [disabled, setDisabled] = useState(true);
    const userId = Number(props.match.params.id);
    const selectedUser = useSelector(state => state.find(el => el.id === userId));
    const formFields = Object.keys(selectedUser).reduce((accu, fieldName) =>
        {if(fieldName === "id" || fieldName === "isDelete") {
            return accu;
        } else {
            return [...accu, {name: fieldName, value: selectedUser[fieldName], isValid: true, className: "form-control", error: ""}]
        }}
       ,[]);

    function handleChangeMode() {
        setMode("Edit");
        setDisabled(false);
    }

    // TODO: Input does not need to be passed. Can't we infer the disabled state from mode?
    //       Like const disabled =  mode === UserFormMode.VIEW inside the UserForm component
    return (
        <AddUserForm fields={formFields} mode={mode} changeMode={handleChangeMode} input={disabled} userId={userId}/>
    )
}

export default UserItem;