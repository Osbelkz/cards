import React, {useCallback} from 'react';
import NewPassword from "./NewPassword";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {NewPasswordStateType, setNewPasswordTC} from "../../../n1-main/m2-bll/reducers/newPassword-reducer";
import { Redirect } from 'react-router-dom';

const NewPasswordContainer = () => {

    const dispatch = useDispatch()
    const {isSetNewPassword, isLoading, error, isOk} =
        useSelector<RootStateType, NewPasswordStateType>(state => state.newPassword)


    const handleOnSubmit = useCallback((newPassword: string, token: string) => {
        dispatch(setNewPasswordTC(newPassword, token))
    }, []
    )

    if (isSetNewPassword) {
        return <Redirect to={"/login"}/>
    }

    return (
        <NewPassword
            isSetNewPassword={isSetNewPassword}
            error={error}
            handleOnSubmit={handleOnSubmit}
            isOk={isOk}
            isLoading={isLoading}
        />
    );
};

export default NewPasswordContainer;
