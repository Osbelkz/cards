import React from 'react';
import Register from "./Register";
import {useDispatch} from "react-redux";

const RegisterContainer = () => {

    const dispatch = useDispatch();

    return (
        <Register />
    );
};

export default RegisterContainer;
