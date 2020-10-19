import React, {ChangeEvent} from 'react';
import classes from "./NewPassword.module.css";
import {Input} from "../../../n1-main/m1-ui/common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import NavItem from "../../../n1-main/m1-ui/common/NavItem/NavItem";

type NewPasswordPropsType = {
    onChange1: (e: string) => void
    onChange2: (e: string) => void
    value1: string
    value2: string
}

const NewPassword = (props: NewPasswordPropsType) => {
    const onChangeHandlerForFirstInput = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange1(e.currentTarget.value)
    }
    const onChangeHandlerForSecondInput = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange2(e.currentTarget.value)
    }
    return (
        <div className={classes.newPassword}>
            <h3>New password page</h3>
            <Input
                placeholder={"Please, put new password"}
                error={false}
                value={props.value1}
                onChange={onChangeHandlerForFirstInput}
            />
            <Input
                placeholder={"Put new password again"}
                error={false}
                value={props.value2}
                onChange={onChangeHandlerForSecondInput}
            />
            <Button
                onClick={() => alert(props.value1 + " " + props.value2)}
                btnName={"Set new password"}
            />
            <NavItem path={"/login"} title={"Login"}/>
        </div>
    );
};

export default NewPassword;
