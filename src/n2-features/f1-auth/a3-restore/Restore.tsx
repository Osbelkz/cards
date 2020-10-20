import React from 'react';
import classes from "./Restore.module.css";
import {Input} from "../../../n1-main/m1-ui/common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import NavItem from "../../../n1-main/m1-ui/common/NavItem/NavItem";
import {useFormik} from "formik";

type RestorePropsType = {
    textAfterRequest: string,
    isSentSuccess: boolean,
    handleOnSubmit: (value: string) => void
}

const Restore = React.memo((props: RestorePropsType) => {
    console.log("restore render")

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            props.handleOnSubmit(values.email)
        }
    })

    return (
        <div className={classes.restore}>
            <form onSubmit={formik.handleSubmit}>
                <h3>Restore password page</h3>
                <Input
                    placeholder={"Please, put your email"}
                    error={false}
                    {...formik.getFieldProps("email")}
                />
                <Button
                    type={'submit'}
                    btnName={"Send email"}
                />
            </form>
            <NavItem path={"/login"} title={"Login"}/>
            {props.textAfterRequest && <div className={props.isSentSuccess ? classes.infoTextGreen : classes.infoTextRed}>{props.textAfterRequest}</div>}
        </div>
    );
});

export default Restore;
