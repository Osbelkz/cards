import React, {useCallback} from 'react';
import Restore from "./Restore";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {RestorePasswordStateType, restoreTC} from "../../../n1-main/m2-bll/reducers/restorePassword-reducer";

const RestoreContainer = () => {

    const dispatch = useDispatch()
    const {textAfterRequest, isLoading, isSentSuccess} =
        useSelector<RootStateType, RestorePasswordStateType>(state => state.restorePassword)

    const handleOnSubmit = useCallback((email: string) => {
        dispatch(restoreTC(email))
        }, []
    )

    return (
        <Restore
            textAfterRequest={textAfterRequest}
            isSentSuccess={isSentSuccess}
            handleOnSubmit={handleOnSubmit}
            isLoading={isLoading}
        />
    );
};

export default RestoreContainer;
