import React from 'react';
import classes from "./Login.module.css";
import {Input} from "../../../n1-main/m1-ui/common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import {useFormik} from "formik";

type RestorePropsType = {
    isSentSuccess: boolean,
    isLoading: boolean,
    handleOnSubmit: () => void
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
            alert(values.email + " " + values.password + " " + values.rememberMe)
            // props.handleOnSubmit(values.email)
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
                        btnName={"Send email"}
                        disabled={props.isLoading}
                        btnType={"green"}
                    />
                    <Button btnName={"Reset"} onClick={() => formik.resetForm()}/>
                </div>
            </form>
            {props.isLoading && <div className={classes.loading}>...Loading</div>}
        </div>
    );
});

export default Login;