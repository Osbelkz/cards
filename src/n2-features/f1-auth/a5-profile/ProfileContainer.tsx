import React from 'react';
import Profile from "./Profile";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import { UserDataType } from '../../../n1-main/m3-dal/auth-api';

const ProfileContainer = () => {
    const userData = useSelector<RootStateType, UserDataType | null>(state => state.login.userData)

    if(!userData) return <div></div>

    return <Profile userData={userData}/>
};

export default ProfileContainer;
