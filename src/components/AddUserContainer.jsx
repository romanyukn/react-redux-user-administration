import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {UserFormMode} from './UserForm';
import { useHistory } from "react-router-dom";
import UserForm from './UserForm';

function AddUserContainer() {
    const [mode, setMode] = useState(UserFormMode.ADD);
    const history = useHistory();
    const dispatch = useDispatch();

    function handleClose() {
        history.push("/users");
    }

    function sendToStore(user, mode) {
        dispatch({
            type: mode,
            payload: user
        })
    }

    return (
        <UserForm mode={mode} onSubmit={sendToStore} onCancel={handleClose}/>
    )
}

export default AddUserContainer;
