import React from 'react';

function AddUserFormField(props) {
    const {name, value, isValid, className, error, onChange, onFocus, changeMode} = props;
    function  fieldType() {
        if (name === "password") return ("password");
        return ("text")
    }
    return(
        <div className="form-group">
            <input
                type={fieldType()}
                className={className}
                id="formGroupExampleInput"
                name={name}
                value={value}
                isvalid={isValid}
                placeholder={name}
                onChange={(e) => onChange({...props, value: e.target.value})}
                onFocus={() => onFocus(name)}
                disabled={changeMode}
            />
            {!isValid && <div className="invalid-feedback">{error}</div>}
            
        </div>
    )
}

export default AddUserFormField;