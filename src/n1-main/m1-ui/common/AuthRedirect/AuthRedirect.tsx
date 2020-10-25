import React, {useEffect} from 'react';
import {Preloader} from "../Preloader/Preloader";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../m2-bll/store";
import {authMeTC, StatusType} from "../../../m2-bll/reducers/app-reducer";

const AuthRedirect: React.FC = (props) => {
    const dispatch = useDispatch();
    const initApp = useSelector<RootStateType, StatusType>(state => state.app.initApp)
    const isLoggedSuccess = useSelector<RootStateType, boolean>(state => state.login.isLoggedSuccess)


    useEffect(() => {
        if (initApp === "idle" && !isLoggedSuccess) {
            dispatch(authMeTC())
        }
    }, [initApp, isLoggedSuccess])

    if (initApp === "loading" || initApp === "idle") {
        return <Preloader/>
    }
    if (!isLoggedSuccess) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div>
            {props.children}
        </div>
    );
};

export default AuthRedirect;
