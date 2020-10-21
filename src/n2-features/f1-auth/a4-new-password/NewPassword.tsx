import React from "react";
import classes from "./NewPassword.module.css";
import {Input} from "../../../n1-main/m1-ui/common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import NavItem from "../../../n1-main/m1-ui/common/NavItem/NavItem";
import {useFormik} from "formik";
import {Redirect, useParams} from "react-router-dom";

type NewPasswordPropsType = {
    isSetNewPassword: boolean
    error: string
    isOk: string
    handleOnSubmit: (value: string, token: string) => void
}

type FormikErrorType = {
    password1?: string
    password2?: string
}


const NewPassword = React.memo((props: NewPasswordPropsType) => {
    console.log(props.isSetNewPassword, props.isOk)
    const {token}  = useParams<{token: string}>()

    const formik = useFormik({
        initialValues: {
            password1: "",
            password2: ""
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password1) {
                errors.password1 = "Field is required!"
            } else if (values.password1.length < 8) {
                errors.password1 = "Too short password, min 8 symbols"
            }
            if (!values.password2) {
                errors.password2 = "Field is required!"
            } else if (values.password2.length < 8) {
                errors.password2 = "Too short password, min 8 symbols"
            } else if (values.password1 !== values.password2) {
                errors.password2 = "Both fields must be equal!"
            }
            return errors
        },
        onSubmit: values => {
            props.handleOnSubmit(values.password1, token)
        }
    })

    return (
        <div className={classes.newPassword}>
            <form onSubmit={formik.handleSubmit}>
                <h3>New password page</h3>
                <Input
                    placeholder={"Please, put new password"}
                    errorCondition={!!formik.errors.password1 && formik.touched.password1}
                    errorText={formik.errors.password1}
                    {...formik.getFieldProps("password1")}

                />
                <Input
                    placeholder={"Put new password again"}
                    errorCondition={!!formik.errors.password2 && formik.touched.password2}
                    errorText={formik.errors.password2}
                    {...formik.getFieldProps("password2")}
                />
                <Button
                    type={"submit"}
                    btnName={"Set new password"}
                />
                <NavItem path={"/login"} title={"Login"}/>
            </form>
            {!props.isSetNewPassword && props.error
                ? <div className={classes.infoTextRed}>{props.error}</div>
                : ""
            }
            {props.isSetNewPassword && props.isOk
                ? <div className={classes.infoTextGreen}>{props.isOk}</div>
                : ""
            }
        </div>
    );
});

export default NewPassword;
