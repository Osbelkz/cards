import React, {useState} from 'react';
import Restore from "./Restore";
import {useDispatch} from "react-redux";

const RestoreContainer = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('')

    return (
        <Restore
            onChange={setEmail}
            value={email}
        />
    );
};

export default RestoreContainer;
