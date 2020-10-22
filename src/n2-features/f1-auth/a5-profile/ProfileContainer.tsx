import React, {useEffect} from 'react';
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {UserDataType} from "../../../n1-main/m3-dal/profile-api";
import {Redirect, useHistory} from 'react-router-dom';
import {StatusType} from "../../../n1-main/m2-bll/reducers/register-reducer";
// import {authMeTC} from "../../../n1-main/m2-bll/reducers/profileP-reducer";

const ProfileContainer = () => {

    const dispatch = useDispatch();
    const status = useSelector<RootStateType, StatusType>(state => state.profile.status)
    const userData = useSelector<RootStateType, UserDataType | null>(state => state.profile.userData)
    const error = useSelector<RootStateType, string>(state => state.profile.error)
    const history = useHistory()

    // useEffect(() => {
    //     if (status === "idle" || userData === null) {
    //         dispatch(authMeTC())
    //     }
    //     console.log(error)
    // }, [status, userData])
    //
    // if (status !== "succeeded") {
    //     if (status==="failed") {
    //         setTimeout(()=> history.push("/login"), 2000)
    //     }
    //
    //     return <div>{status === "loading" ? "loading" : error}</div>
    // }
    return <Profile userData={userData}/>
};

export default ProfileContainer;
