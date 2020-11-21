import React from 'react';
import classes from "./Login.module.scss";
import {Input} from "../../../n1-main/m1-ui/common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import {useFormik} from "formik";
import NavItem from "../../../n1-main/m1-ui/common/NavItem/NavItem";

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

const Login: React.FC<RestorePropsType> = React.memo(({error, isLoading, handleOnSubmit, isLoggedSuccess}) => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Required!"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Required!"
            } else if (values.password.length < 7) {
                errors.password = "Too short password, min 7 symbols"
            }
            return errors
        },
        onSubmit: values => {
            handleOnSubmit(values.email.toLowerCase().trim(), values.password, values.rememberMe)
        }
    })

    return (
        <div className={classes.login}>
            <div className={classes.login__container}>
            <form className={classes.login__form} onSubmit={formik.handleSubmit}>
                <div className={classes.login__title}>
                    <h3>Login page</h3>
                </div>
                <div className={classes.login__inputs}>
                <Input
                    label={"Email"}
                    placeholder={"Please, put your email"}
                    errorCondition={!!formik.errors.email && formik.touched.email}
                    errorText={formik.errors.email}
                    {...formik.getFieldProps("email")}/>
                <Input
                    label={"Password"}
                    type={"password"}
                    placeholder={"Please, put your password"}
                    errorCondition={!!formik.errors.password && formik.touched.password}
                    errorText={formik.errors.password}
                    {...formik.getFieldProps("password")}/>
                <div className={classes.login__checkbox}>
                    <input
                        id={"remember"}
                        className={classes.checkbox}
                        type={"checkbox"}
                        checked={formik.values.rememberMe}
                        {...formik.getFieldProps("rememberMe")}/>
                    <label htmlFor={"remember"}>remember me</label>
                </div>

                </div>
                <div className={classes.login__buttons}>
                    <Button
                        type={"submit"}
                        btnName={"Login"}
                        disabled={!formik.isValid || (isLoading) || !formik.values.email}
                        btnType={"green"}
                    />
                    <Button btnName={"Reset"} type={"reset"} onClick={() => formik.resetForm()}/>
                </div>
                <NavItem path={"/restore"} title={"Forgot your password?"}/>
                {error && <div className={classes.infoTextRed}>{error}</div>}
                {isLoading && <div className={classes.loading}>...Loading</div>}
            </form>
            </div>
        </div>
    );
});

export default Login;
