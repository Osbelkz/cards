import React, {useCallback} from 'react';
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import { logoutUserInAppTC } from '../../../n1-main/m2-bll/reducers/profileP-reducer';
import { UserDataType } from '../../../n1-main/m3-dal/auth-api';

const ProfileContainer = () => {


    const dispatch = useDispatch();
    const userData = useSelector<RootStateType, UserDataType | null>(state => state.profile.userData)

    const logoutHandler = useCallback(() => {
        dispatch(logoutUserInAppTC())
    }, [])

    if(!userData) return <div></div>

    return <Profile userData={userData} logout={logoutHandler}/>
};

export default ProfileContainer;
