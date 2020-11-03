import React from "react";
import classes from "./NewPassword.module.scss";
import {Input} from "../../../n1-main/m1-ui/common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import NavItem from "../../../n1-main/m1-ui/common/NavItem/NavItem";
import {useFormik} from "formik";
import {useParams} from "react-router-dom";

type NewPasswordPropsType = {
    isSetNewPassword: boolean
    error: string
    isOk: string
    isLoading: boolean
    handleOnSubmit: (value: string, token: string) => void
}

type FormikErrorType = {
    password1?: string
    password2?: string
}


const NewPassword: React.FC<NewPasswordPropsType> = React.memo(({isLoading, handleOnSubmit, error, isOk, isSetNewPassword}) => {

    const {token} = useParams<{ token: string }>()

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
            handleOnSubmit(values.password1, token)
        }
    })

    return (
        <div className={classes.newPassword}>
            <div className={classes.newPassword__container}>
                <form className={classes.newPassword__form} onSubmit={formik.handleSubmit}>
                    <div className={classes.newPassword__title}>
                        <h3>New password page</h3>
                    </div>
                    <div className={classes.newPassword__inputs}>
                        <Input
                            label={"New password"}
                            placeholder={"Please, put new password"}
                            errorCondition={!!formik.errors.password1 && formik.touched.password1}
                            errorText={formik.errors.password1}
                            {...formik.getFieldProps("password1")}

                        />
                        <Input
                            label={"Repeat new password"}
                            placeholder={"Put new password again"}
                            errorCondition={!!formik.errors.password2 && formik.touched.password2}
                            errorText={formik.errors.password2}
                            {...formik.getFieldProps("password2")}
                        />
                    </div>
                    <div className={classes.newPassword__buttons}>
                        <Button
                            type={"submit"}
                            btnName={"Set new password"}
                            disabled={!formik.isValid || (isLoading)}
                            btnType={"green"}/>
                        <Button btnName={"Reset"} type={"reset"} onClick={() => formik.resetForm()}/>
                    </div>
                    <NavItem path={"/login"} title={"Login"}/>
                </form>
                {!isSetNewPassword && error
                    ? <div className={classes.infoTextRed}>{error}</div>
                    : ""
                }
                {isSetNewPassword && isOk
                    ? <div className={classes.infoTextGreen}>{isOk}</div>
                    : ""
                }
                {isLoading && <div className={classes.loading}>...Loading</div>}
            </div>
        </div>
    );
});

export default NewPassword;
