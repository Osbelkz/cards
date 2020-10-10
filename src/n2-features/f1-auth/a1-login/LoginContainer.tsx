import React from 'react';
import Login from "./Login";
import {useDispatch} from "react-redux";

const LoginContainer = () => {

    const dispatch = useDispatch();

    return (
        <Login />
    );
};

export default LoginContainer;
