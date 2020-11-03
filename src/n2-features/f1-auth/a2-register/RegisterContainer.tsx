import React, {useCallback} from 'react';
import Register from "./Register";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {addUserTC, RegisterStateType} from "../../../n1-main/m2-bll/reducers/register-reducer";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import { RequestRegisterType } from '../../../n1-main/m3-dal/auth-api';


const RegisterContainer = () => {

    const dispatch = useDispatch();
    const {error, status} = useSelector<RootStateType, RegisterStateType>(state => state.register)

    const onSubmitHandler = useCallback((values: RequestRegisterType) => {
        dispatch(addUserTC(values))
    }, [])

    if (status==="succeeded") {
        return <Redirect to={"/login"}/>
    }

    return (
        <Register onSubmit={onSubmitHandler} error={error} status={status}/>
    );
};

export default RegisterContainer;
