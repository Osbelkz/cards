import React, {useState} from 'react';
import NewPassword from "./NewPassword";
import {useDispatch} from "react-redux";

const NewPasswordContainer = () => {

    const dispatch = useDispatch();

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
