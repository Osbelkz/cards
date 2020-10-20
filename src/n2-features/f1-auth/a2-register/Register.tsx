import React from 'react';
import {Input} from '../../../n1-main/m1-ui/common/Input/Input';
import classes from "./Register.module.css";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import {useFormik} from "formik";
import {RegisterDataType} from "../../../n1-main/m3-dal/register-api";
import {StatusType} from "../../../n1-main/m2-bll/reducers/register-reducer";

type PropsType = {
    onSubmit: (data: RegisterDataType) => void
    error: string
    status: StatusType
}

type FormikErrorType = {
    email?: string
    password?: string
    password2?: string
}

const Register: React.FC<PropsType> = (props) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password2: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password || values.password.length < 7) {
                errors.password = "Must be 7 or more characters"
            }
            if (values.password !== values.password2) {
                errors.password2 = "Passwords does not match"
            }
            return errors;
        },

        onSubmit: (values, {resetForm}) => {
            props.onSubmit({email: values.email, password: values.password})
        },
    });

    return (
        <div className={classes.register}>
            <div className={classes.register__container}>
                <form className={classes.register__form} onSubmit={formik.handleSubmit}>
                    <h3>Registration</h3>
                    <div className={classes.register__inputs}>
                        <div>
                            <Input label={"Email"}
                                   error={!!formik.errors.email && formik.touched.email}
                                   placeholder={"email"}
                                   {...formik.getFieldProps("email")}/>
                            {formik.errors.email && formik.touched.email ? <span
                                className={classes.register__inputs_error}>{formik.errors.email}</span> : null}
                        </div>
                        <div>
                            <Input label={"Password"}
                                   error={!!formik.errors.password && formik.touched.password}
                                   type={"password"}
                                   placeholder={"password"}
                                   {...formik.getFieldProps("password")}/>
                            {formik.errors.password && formik.touched.password ? <span
                                className={classes.register__inputs_error}>{formik.errors.password}</span> : null}
                        </div>
                        <div>
                            <Input label={"Repeat password"}
                                   error={!!formik.errors.password2 && formik.touched.password2}
                                   type={"password"}
                                   placeholder={"Confirm password"}
                                   {...formik.getFieldProps("password2")} />
                            {formik.errors.password2 && formik.touched.password2 ? <div
                                className={classes.register__inputs_error}>{formik.errors.password2}</div> : null}
                        </div>
                    </div>
                    {props.error && <div className={classes.register__error}>{props.error}</div>}
                    <Button btnName={"Join"} btnType={"green"} type={"submit"} disabled={!formik.isValid}/>
                    <Button btnName={"Reset"} onClick={() => formik.resetForm()}/>
                </form>
            </div>
        </div>
    );
};

export default Register;
