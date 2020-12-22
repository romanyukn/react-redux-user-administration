import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {UserFormMode} from './UserForm';
import { useHistory } from "react-router-dom";
import UserForm from './UserForm';

function ViewUserContainer(props) {
    const [mode, setMode] = useState(UserFormMode.VIEW);
    const userId = Number(props.match.params.id);
    const user = useSelector(state => state.find(el => el.id === userId));
    const history = useHistory();
    const dispatch = useDispatch();
    
    function handleChangeMode() {
        setMode(UserFormMode.EDIT);
    }

    function handleClose() {
        history.push("/users");
    }

    function editInStore(user, mode) {
        dispatch({
            type: mode,
            payload: user
        })
    }

    return (
        <UserForm user={user} mode={mode} onModeChange={handleChangeMode} onSubmit={editInStore} onCancel={handleClose}/>
    )
}

export default ViewUserContainer;