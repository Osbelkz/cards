import React, {InputHTMLAttributes} from "react";
import classes from "./Input.module.css";

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: boolean
}

export const Input = React.memo(
    ({error, label, name, ...rest }: PropsType) => {

    return (
            <div className={classes.input}>
                <p className={classes.input__label}>{label}</p>
                <input className={`${classes.input__elem} ${error ? classes.input__error : ""}`}
                       {...rest}/>
            </div>
    )
})
