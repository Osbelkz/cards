import React from 'react';
import Restore from "./Restore";
import {useDispatch} from "react-redux";

const RestoreContainer = () => {

    const dispatch = useDispatch();

    return (
        <Restore />
    );
};

export default RestoreContainer;
