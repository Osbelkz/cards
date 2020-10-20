import React, {useCallback} from 'react';
import Restore from "./Restore";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {restoreTC} from "../../../n1-main/m2-bll/reducers/restorePassword-reducer";

const RestoreContainer = () => {
    console.log("render container")
    const dispatch = useDispatch()
    const textAfterRequest = useSelector<RootStateType, string>(state => state.restorePassword.textAfterRequest)
    const isSentSuccess = useSelector<RootStateType, boolean>(state => state.restorePassword.isSentSuccess)

    const handleOnSubmit = useCallback((value: string) => {
        dispatch(restoreTC({
            email: value,
            from: "admin",
            message: `<div style="background-color: lime; padding: 15px">
                    password recovery link: 
                    <a href='http://localhost:3000/cards#/newPassword/$token$'> 
                    link</a>
                </div>` // после полной заливки на ghp, заменить ссылку на страницу new password on ghp
        }))
        }, []
    )
    return (
        <Restore
            textAfterRequest={textAfterRequest}
            isSentSuccess={isSentSuccess}
            handleOnSubmit={handleOnSubmit}
        />
    );
};

export default RestoreContainer;
