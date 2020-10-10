import React from 'react';
import Profile from "./Profile";
import {useDispatch} from "react-redux";

const ProfileContainer = () => {

    const dispatch = useDispatch();

    return (
        <Profile/>
    );
};

export default ProfileContainer;
