import React from 'react';
import NewPassword from "./NewPassword";
import {useDispatch} from "react-redux";

const NewPasswordContainer = () => {

    const dispatch = useDispatch();

    return (
        <NewPassword />
    );
};

export default NewPasswordContainer;
