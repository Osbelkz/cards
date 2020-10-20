import React, {useState} from 'react';
import NewPassword from "./NewPassword";

const NewPasswordContainer = () => {
    const [firstInput, setFirstInput] = useState('')
    const [secondInput, setSecondInput] = useState('')

    return (
        <NewPassword
            value1={firstInput}
            value2={secondInput}
            onChange1={setFirstInput}
            onChange2={setSecondInput}
        />
    );
};

export default NewPasswordContainer;
