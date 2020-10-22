import React, {useCallback} from 'react';
import Login from "./Login";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {logInUserInAppTC} from "../../../n1-main/m2-bll/reducers/login-reducer";
import { Redirect } from 'react-router-dom';

const LoginContainer = () => {
    const dispatch = useDispatch();

    const isLoggedSuccess = useSelector<RootStateType, boolean>(state => state.login.isLoggedSuccess)
    const isLoading = useSelector<RootStateType, boolean>(state => state.login.isLoading)
    const error = useSelector<RootStateType, string>(state => state.login.error)

    const handleOnSubmit = useCallback((email: string, password: string, rememberMe: boolean) => {
        dispatch(logInUserInAppTC(email, password,rememberMe))
    }, []
    )

    if (isLoggedSuccess) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <Login
            isLoading={isLoading}
            isLoggedSuccess={isLoggedSuccess}
            error={error}
            handleOnSubmit={handleOnSubmit}
        />
    );
};

export default LoginContainer;
