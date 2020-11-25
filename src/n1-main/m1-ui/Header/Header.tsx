import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../m2-bll/store";
import {UserDataType} from "../../m3-dal/auth-api";
import {NavLogIn, NavLogOut} from "./Nav/Nav";
import {logoutUserInApp} from "../../m2-bll/reducers/login-reducer";

const Header = () => {
    const dispatch = useDispatch();
    const userData = useSelector<RootStateType, UserDataType | null>(state => state.login.userData)

    const logoutHandler = useCallback(() => {
        dispatch(logoutUserInApp())
    }, [])

    if(!userData) return <NavLogOut />

    return <NavLogIn logout={logoutHandler}/>
};

export default Header;
