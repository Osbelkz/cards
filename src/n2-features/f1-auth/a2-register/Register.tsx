import React from 'react';
import {Input} from '../../../n1-main/m1-ui/common/Input/Input';
import classes from "./Register.module.css";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import {useFormik} from "formik";
import {RequestRegisterType} from "../../../n1-main/m3-dal/auth-api";
import { StatusType } from '../../../n1-main/m2-bll/reducers/app-reducer';

type PropsType = {
    onSubmit: (data: RequestRegisterType) => void
    error: string
    status: StatusType
}

type FormikErrorType = {
    email?: string
    password?: string
    password2?: string
}

const Register: React.FC<PropsType> = React.memo((props) => {

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

        onSubmit: (values) => {
            props.onSubmit({email: values.email, password: values.password})
        },
    });

    return (
        <div className={classes.register}>
            <div className={classes.register__container}>
                <form className={classes.register__form} onSubmit={formik.handleSubmit}>
                    <div className={classes.register__title}>
                        <h3>Registration</h3>
                    </div>
                    <div className={classes.register__inputs}>
                        <Input label={"Email"}
                               errorCondition={!!formik.errors.email && formik.touched.email}
                               placeholder={"email"}
                               errorText={formik.errors.email}
                               {...formik.getFieldProps("email")}/>
                        <Input label={"Password"}
                               errorCondition={!!formik.errors.password && formik.touched.password}
                               type={"password"}
                               placeholder={"password"}
                               errorText={formik.errors.password}
                               {...formik.getFieldProps("password")}/>
                        <Input label={"Repeat password"}
                               errorCondition={!!formik.errors.password2 && formik.touched.password2}
                               type={"password"}
                               errorText={formik.errors.password2}
                               placeholder={"confirm password"}
                               {...formik.getFieldProps("password2")} />
                    </div>
                    <div className={classes.register__buttons}>
                        <Button btnName={"Join"} btnType={"green"} type={"submit"}
                                disabled={!formik.isValid || (props.status === "loading")}/>
                        <Button btnName={"Reset"} type={"reset"} onClick={() => formik.resetForm()}/>
                    </div>
                    {props.error && <div className={classes.register__error}>{props.error}</div>}
                    {props.status === "loading" && <div className={classes.register__loading}>...Loading</div>}
                </form>
            </div>
        </div>
    );
})

export default Register;
