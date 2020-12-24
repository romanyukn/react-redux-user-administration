import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import AddUserFormField from './AddUserFormField';

function creatField(name) {
    return {name: name, value: "", isValid: true, className: "form-control", error: ""};
 }
 
 const formState = [
    creatField("firstName"),
    creatField("lastName"),
    creatField("email"),
    creatField("password")
]

export const UserFormMode = {
    ADD: 'Add',
    EDIT: 'Edit',
    VIEW: 'View'
};

function UserForm(props) {
    const [fields, setFields] = useState(userToFields(props.user) || formState);
    const dispatch = useDispatch();
    const history = useHistory();
    const emailCheck = /^\S+@\S+\.\S+$/

    function userToFields(user) {
        if(user) {
            const formFields = Object.keys(user).reduce((accu, fieldName) => 
                {if(fieldName === "id" || fieldName === "isDelete") {
                    return accu;
                } else {
                    return [...accu, {name: fieldName, value: user[fieldName], isValid: true, className: "form-control", error: ""}]
                }}
            ,[]);
            return formFields;
        }  
    }

    function onInputChange(eachField) {
        const dataFields = fields.map((el) => {
            if (el.name === eachField.name) {
                return eachField;
            }
            else {
                return (el);
            } 
        })
        setFields(dataFields); 
    }

    function validate(fieldsToValidate) {
        const validated = fieldsToValidate.map((fieldToValidate) => {
            if(fieldToValidate.value === "") {
                return ({...fieldToValidate, className: "form-control is-invalid", isValid: false, error: `${fieldToValidate.name} cannot be empty`})
            } else if (fieldToValidate.name === "Email Address"){
                return validateEmail(fieldToValidate);   
            } return ({...fieldToValidate, isValid: true, className: "form-control"})
        })
        return (validated);
    }

    function validateEmail(el) {
        if (!emailCheck.test(el.value)) {
            return ({...el, className: "form-control is-invalid", isValid: false, error: "It doesn't look like an e-mail"});
        } else {
            return (el);
        }
    }

    function handleFocus(fieldName) {
        const fieldsChanged = fields.map((el) => {
            if(el.name === fieldName) {
                return ({...el, isValid: true, className: "form-control"})
            } else {
                return (el);
            }
        })
        setFields(fieldsChanged);
    }

    function cleanForm(form) {
        const cleanedForm = form.map((el) => {
            return ({...el, value: ""});
        })
        return (cleanedForm);
    }

    function createObject() {
        const user = props.user || {};
        const result = fields.reduce((accu, el) => ({
            ...accu,
            id: user.id,
            [el.name]: el.value
        }), {});
        return result;
    }
    createObject();

    function sendToStore() {
        const formObject = createObject();
        dispatch({
            type: "userAdded",
            payload: formObject
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const filledForm = validate(fields);
        const isAllFieldsValid = filledForm.every((el) => el.isValid === true);
        if (isAllFieldsValid) {
            const validForm = cleanForm(filledForm);
            setFields(validForm);
        } else {
            setFields(filledForm);
        }
        const formObject = createObject();
        props.mode === UserFormMode.EDIT && props.onSubmit(formObject, UserFormMode.EDIT);
        props.mode === UserFormMode.ADD && sendToStore();
        history.push("/users");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-3 p-5">
                </div>
                <div className="col-6 p-5">
                    <div className="frame">  
                        <form onSubmit={handleSubmit}>
                            {fields.map((el) => {
                                return <AddUserFormField 
                                    key={el.name} 
                                    name={el.name} 
                                    value={el.value}
                                    isValid={el.isValid}
                                    error={el.error}
                                    className={el.className}
                                    onChange={onInputChange}
                                    onFocus={handleFocus}
                                    changeMode={props.mode === UserFormMode.VIEW}
                                    />}
                                )
                            }
                            {props.mode === UserFormMode.VIEW && 
                            <div>
                                <button type="button" className="btn btn-primary mr-3" onClick={props.onModeChange}>Edit</button>
                                <button type="button" className="btn btn-secondary" onClick={props.onCancel}>Cancel</button>
                            </div>}
                            {props.mode === UserFormMode.EDIT && 
                            <div>
                                <button type="button" className="btn btn-success mr-3" onClick={handleSubmit}>Save</button>
                                <button type="button" className="btn btn-secondary" onClick={props.onCancel}>Cancel</button>
                            </div>}
                            {props.mode === UserFormMode.ADD && <button className="btn btn-success btn-lg btn-block">
                                ADD A NEW USER
                            </button>}
                        </form>
                    </div>    
                </div>
                <div className="col-3 p-5">
                </div> 
            </div>
        </div>
    )
}

export default UserForm;