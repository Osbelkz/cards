import React, {useCallback} from 'react';
import Restore from "./Restore";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {restoreTC} from "../../../n1-main/m2-bll/reducers/restorePassword-reducer";

const RestoreContainer = () => {
    const dispatch = useDispatch()
    const textAfterRequest = useSelector<RootStateType, string>(state => state.restorePassword.textAfterRequest)
    const isSentSuccess = useSelector<RootStateType, boolean>(state => state.restorePassword.isSentSuccess)

    const handleOnSubmit = useCallback((value: string) => {
        dispatch(restoreTC(value))
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
