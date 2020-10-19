import React, {ChangeEvent} from 'react';
import classes from "./Restore.module.css";
import {Input} from "../../../n1-main/m1-ui/common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import NavItem from "../../../n1-main/m1-ui/common/NavItem/NavItem";

type RestorePropsType = {
    onChange: (e: string) => void
    value: string
}
const Restore = (props: RestorePropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value)
    }
    return (
        <div className={classes.restore}>
            <h3>Restore password page</h3>
            <Input
                placeholder={"Please, put your email"}
                error={false}
                value={props.value}
                onChange={onChangeHandler}
            />
            <Button
                onClick={() => alert(props.value)}
                btnName={"Send email"}
            />
            <NavItem path={"/login"} title={"Login"}/>
        </div>
    );
};

export default Restore;
