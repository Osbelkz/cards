import React, {useEffect} from 'react';
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {Redirect} from 'react-router-dom';
import {authMeTC, StatusType} from "../../../n1-main/m2-bll/reducers/app-reducer";
import { logoutUserInAppTC } from '../../../n1-main/m2-bll/reducers/profileP-reducer';
import { UserDataType } from '../../../n1-main/m3-dal/auth-api';

const ProfileContainer = () => {


    const dispatch = useDispatch();
    const userData = useSelector<RootStateType, UserDataType | null>(state => state.profile.userData)
    const initApp = useSelector<RootStateType, StatusType>(state => state.app.initApp)
    const isLoggedSuccess = useSelector<RootStateType, boolean>(state => state.login.isLoggedSuccess)


    useEffect(() => {
        if (initApp === "idle" && !isLoggedSuccess) {
            dispatch(authMeTC())
        }
    }, [initApp, isLoggedSuccess])


    const logoutHandler = () => {
        dispatch(logoutUserInAppTC())
    }

    if (!userData || !isLoggedSuccess) {
        return <Redirect to={"/login"}/>
    }

    return <Profile userData={userData} logout={logoutHandler}/>
};

export default ProfileContainer;
