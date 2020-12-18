import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import AddUserFormField from './AddUserFormField';

function creatField(name) {
    return {name: name, value: "", isValid: true, className: "form-control", error: ""};
 }

 // TODO: May not be required anymore after the big refactor suggested below.
 const formState = [
    creatField("firstName"),
    creatField("lastName"),
    creatField("email"),
    creatField("password")
]

// TODO: Rename to UserFormMode and export from this file so it can be used by users of this component.
const FormMode = {
    ADD: 'Add',
    EDIT: 'Edit',
    VIEW: 'View'
};

// TODO: Rename to UserForm. It doesn't make sense to call this
//       AddUserForm anymore now that it accepts different modes.
// TODO: Stretch Goal. UserForm now has multiple responsibilities.
//       It does presentation and also does state management. There
//       is a pattern of separating them. See this for more details.
//      See for more info. https://scotch.io/courses/5-essential-react-concepts-to-know-before-learning-redux/presentational-and-container-component-pattern-in-react
//       Should we consider changing the usage like below:
//          <UserForm user={user} mode={mode} />
//      So for add mode it will look like this:
//          const user = {
//                  id: '',
//                  firstname: '',
//                  lastname: '',
//                  email: '',
//                  password: ''
//          };
//          <UserForm user={user} mode={UserFormMode.ADD} onCancel={cancelButtonPressed} onSubmit={submitButtonPressed} />
//      So for edit mode it will look like this:
//          const user = {
//                  id: '097cd51d-de36-4544-97ac-82d504ec8656',
//                  firstname: 'Jake',
//                  lastname: 'Sta Teresa',
//                  email: 'jake@stateresa.co',
//                  password: 'omgwtfbbq'
//          };
//          <UserForm user={user} mode={UserFormMode.VIEW} onModeChanged={modeChanged} onCancel={cancelButtonPressed} onSubmit={submitButtonPressed} />
//      Some notes on this implemenrtation:
//          - onSubmit function should pass the UserFormMode as well as the user
//          - onCancel should probably accept the same. Although I don't see any uses of the values yet in that handler
//          - onModeChanged should accept the previousMode, currentMode and the user
//          - All conversion between formFields state and user object is enclosed in the component
//          - The minor inconvenience is keeping user id somewhere and tucking it back later
//      Let me know if you have any questions...
function AddUserForm(props) {
    const [fields, setFields] = useState(props.fields || formState);
    const dispatch = useDispatch();
    const history = useHistory();
    const emailCheck = /^\S+@\S+\.\S+$/

    function onInputChange(eachField) {
        const dataFields = fields.map((el) => {
            if (el.name === eachField.name) {
                return eachField;
            }
            else {
                // Nit: parenthesis can be removed
                return (el);
            }
        })
        setFields(dataFields);
    }

    function validate(fieldsToValidate) {
        const validated = fieldsToValidate.map((fieldToValidate) => {
            if(fieldToValidate.value === "") {
                // Nit: parenthesis can be removed
                return ({...fieldToValidate, className: "form-control is-invalid", isValid: false, error: `${fieldToValidate.name} cannot be empty`})
            } else if (fieldToValidate.name === "Email Address"){
                return validateEmail(fieldToValidate);
            // Nit: parenthesis can be removed
            } return ({...fieldToValidate, isValid: true, className: "form-control"})
        })
        return (validated);
    }

    function validateEmail(el) {
        if (!emailCheck.test(el.value)) {
            // Nit: parenthesis can be removed
            return ({...el, className: "form-control is-invalid", isValid: false, error: "It doesn't look like an e-mail"});
        } else {
            // Nit: parenthesis can be removed
            return (el);
        }
    }

    function handleFocus(fieldName) {
        const fieldsChanged = fields.map((el) => {
            if(el.name === fieldName) {
                // Nit: parenthesis can be removed
                return ({...el, isValid: true, className: "form-control"})
            } else {
                // Nit: parenthesis can be removed
                return (el);
            }
        })
        setFields(fieldsChanged);
    }

    function cleanForm(form) {
        const cleanedForm = form.map((el) => {
            // Nit: parenthesis can be removed
            return ({...el, value: ""});
        })
        // Nit: parenthesis can be removed
        return (cleanedForm);
    }

    function createObject() {
        const result = fields.reduce((accu, el) => ({
            ...accu,
            id: props.userId,
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

    function editInStore() {
        const formObject = createObject();
        dispatch({
            type: "userEdited",
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

        // Nit: No need to enclose in curlies. Consider using if/else
        {props.mode === FormMode.EDIT && editInStore()}
        {props.mode === FormMode.ADD && sendToStore()}
        history.push("/users");
    }

     function handleClose() {
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
                                    changeMode={props.input}
                                    />}
                                )
                            }
                            {props.mode === FormMode.VIEW &&
                            <div>
                                <button type="button" className="btn btn-primary mr-3" onClick={props.changeMode}>Edit</button>
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                            </div>}
                            {props.mode === FormMode.EDIT &&
                            <div>
                                <button type="button" className="btn btn-success mr-3" onClick={handleSubmit}>Save</button>
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                            </div>}
                            {props.mode === FormMode.ADD && <button className="btn btn-success btn-lg btn-block">
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

export default AddUserForm;