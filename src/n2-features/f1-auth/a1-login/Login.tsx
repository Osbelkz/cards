import React from 'react';
import classes from "./Login.module.css";
import {Input} from "../../../n1-main/m1-ui/common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import {useFormik} from "formik";

type RestorePropsType = {
    isLoggedSuccess: boolean,
    isLoading: boolean,
    error: string,
    handleOnSubmit: (email: string, password: string, rememberMe: boolean) => void
}

type FormikErrorType = {
    email?: string
    password?: string
}

const Login = React.memo((props: RestorePropsType) => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Field is required!"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Field is required!"
            } else if (values.password.length < 8) {
                errors.password = "Too short password, min 8 symbols"
            }
            return errors
        },
        onSubmit: values => {
            props.handleOnSubmit(values.email, values.password, values.rememberMe)
        }
    })

    return (
        <div className={classes.login}>
            <form onSubmit={formik.handleSubmit}>
                <h3>Login page</h3>
                <Input
                    label={"Email"}
                    placeholder={"Please, put your email"}
                    errorCondition={!!formik.errors.email && formik.touched.email}
                    errorText={formik.errors.email}
                    {...formik.getFieldProps("email")}
                />
                <Input
                    label={"Password"}
                    type={"password"}
                    placeholder={"Please, put your password"}
                    errorCondition={!!formik.errors.password && formik.touched.password}
                    errorText={formik.errors.password}
                    {...formik.getFieldProps("password")}

                />
                <Input
                    className={classes.checkbox}
                    label={"remember me"}
                    type={"checkbox"}
                    checked={formik.values.rememberMe}
                    {...formik.getFieldProps("rememberMe")}
                />
                <div className={classes.btn}>
                    <Button
                        type={"submit"}
                        btnName={"Login"}
                        disabled={props.isLoading}
                        btnType={"green"}
                    />
                    <Button btnName={"Reset"} onClick={() => formik.resetForm()}/>
                </div>
            </form>
            {props.error && <div className={classes.infoTextRed}>{props.error}</div>}
            {props.isLoading && <div className={classes.loading}>...Loading</div>}
        </div>
    );
});

export default Login;
