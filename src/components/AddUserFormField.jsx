import React from 'react';

function AddUserFormField(props) {
    const {name, value, isValid, className, error, onChange, onFocus, changeMode} = props;
    return(
        <div className="form-group">
            <input
                type="text"
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