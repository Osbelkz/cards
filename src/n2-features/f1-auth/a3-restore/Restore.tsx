import React from "react";
import classes from "./Restore.module.scss";
import {Input} from "../../../n1-main/m1-ui/common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import NavItem from "../../../n1-main/m1-ui/common/NavItem/NavItem";
import {useFormik} from "formik";

type RestorePropsType = {
    textAfterRequest: string,
    isSentSuccess: boolean,
    isLoading: boolean,
    handleOnSubmit: (value: string) => void
}

type FormikErrorType = {
    email?: string
}

const Restore: React.FC<RestorePropsType> = React.memo(({handleOnSubmit, isLoading, isSentSuccess, textAfterRequest}) => {

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
            handleOnSubmit(values.email)
        }
    })

    return (
        <div className={classes.restore}>
            <div className={classes.restore__container}>
                <form className={classes.restore__form} onSubmit={formik.handleSubmit}>
                    <div className={classes.restore__title}>
                        <h3>Restore password</h3>
                    </div>
                    <div className={classes.restore__inputs}>
                        <Input
                            label={"Email"}
                            placeholder={"Please, put your email"}
                            errorCondition={!!formik.errors.email && formik.touched.email}
                            errorText={formik.errors.email}
                            {...formik.getFieldProps("email")}
                        />
                    </div>
                    <div className={classes.restore__buttons}>
                        <Button
                            type={"submit"}
                            btnName={"Send email"}
                            disabled={!formik.isValid || (isLoading) || !formik.values.email}
                            btnType={"green"}/>
                        <Button btnName={"Reset"} type={"reset"} onClick={() => formik.resetForm()}/>
                    </div>
                    <NavItem path={"/login"} title={"Login"}/>
                    {textAfterRequest && <div className={
                        isSentSuccess ? classes.infoTextGreen : classes.infoTextRed
                    }>{textAfterRequest}</div>}
                    {isLoading && <div className={classes.loading}>...Loading</div>}
                </form>

            </div>
        </div>
    );
});

export default Restore;
