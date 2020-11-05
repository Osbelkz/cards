import React from "react";
import classes from "./PageNotFound.module.css";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import {useHistory} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";

export const PageNotFound = () => {

    const isLoggedSuccess = useSelector<RootStateType, boolean>(state => state.login.isLoggedSuccess)
    const history = useHistory()

    const buttonHandler = () => {
        if (isLoggedSuccess) {
            history.push('/profile')
        } else {
            history.push('/login')
        }
    }

    return (
        <div className={classes.wrap}>
            <h2 className={classes.title}>404</h2>
            <h3 className={classes.subtitle}>Sorry, the page not found...</h3>
            <Button btnName={'Go back'} btnType={'green'} onClick={buttonHandler}/>
        </div>
    )
}