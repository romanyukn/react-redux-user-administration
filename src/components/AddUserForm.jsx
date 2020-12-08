import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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

function AddUserForm() {
    const [fields, setFields] = useState(formState);
    const dispatch = useDispatch();
    const emailCheck = /^\S+@\S+\.\S+$/

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
        const result = fields.reduce((accu, el) => ({
            ...accu,
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
        sendToStore();
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
                                    />}
                                )
                            }
                            <button className="btn btn-success btn-lg btn-block">
                                ADD A NEW USER
                            </button>
                        </form>
                    </div>    
                </div>
                <div className="col-3 p-5">
                </div> 
            </div>
        </div>
    )
}

export default AddUserForm;