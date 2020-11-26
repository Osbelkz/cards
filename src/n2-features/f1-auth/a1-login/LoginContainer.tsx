import React, {useCallback} from 'react';
import Login from "./Login";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {logInUserInApp} from "../../../n1-main/m2-bll/reducers/login-reducer";
import { Redirect } from 'react-router-dom';

type LoginStateType = {
    isLoading: boolean
    isLoggedSuccess: boolean
    error: string
}

const LoginContainer = () => {
    const dispatch = useDispatch();
    const {isLoggedSuccess, isLoading, error } = useSelector<RootStateType, LoginStateType>(state => state.login)

    const handleOnSubmit = useCallback((email: string, password: string, rememberMe: boolean) => {
        dispatch(logInUserInApp({email, password, rememberMe}))
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
