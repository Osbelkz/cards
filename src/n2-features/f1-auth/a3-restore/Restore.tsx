import React from "react";
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

type FormikErrorType = {
    email?: string
}

const Restore = React.memo((props: RestorePropsType) => {

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Field is required!"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            return errors
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
                    errorCondition={!!formik.errors.email && formik.touched.email}
                    errorText={formik.errors.email}
                    {...formik.getFieldProps("email")}
                />
                <Button
                    type={"submit"}
                    btnName={"Send email"}
                />
                <NavItem path={"/login"} title={"Login"}/>
            </form>
            {props.textAfterRequest && <div className={props.isSentSuccess ? classes.infoTextGreen : classes.infoTextRed}>{props.textAfterRequest}</div>}
        </div>
    );
});

export default Restore;
