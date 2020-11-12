import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logoutUserInAppTC} from "../../m2-bll/reducers/profileP-reducer";
import {RootStateType} from "../../m2-bll/store";
import {UserDataType} from "../../m3-dal/auth-api";
import {NavLogIn, NavLogOut} from "./Nav/Nav";

const Header = () => {
    const dispatch = useDispatch();
    const userData = useSelector<RootStateType, UserDataType | null>(state => state.profile.userData)

    const logoutHandler = useCallback(() => {
        dispatch(logoutUserInAppTC())
    }, [])

    if(!userData) return <NavLogOut />

    return <NavLogIn logout={logoutHandler}/>
};

export default Header;
