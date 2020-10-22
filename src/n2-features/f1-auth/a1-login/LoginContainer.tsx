import React from 'react';
import Login from "./Login";
import {useDispatch} from "react-redux";

const LoginContainer = () => {

    const dispatch = useDispatch();
    const isSentSuccess = false
    const isLoading = false
    const handleOnSubmit = () => alert("hello")

    return (
        <Login
            isLoading={isLoading}
            isSentSuccess={isSentSuccess}
            handleOnSubmit={handleOnSubmit}
        />
    );
};

export default LoginContainer;
