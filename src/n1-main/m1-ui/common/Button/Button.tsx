import React, { ButtonHTMLAttributes } from "react";
import classes from "./Button.module.css";

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnName: string
    btnType?: "green" | "red"
}

export const Button = React.memo(({btnType, btnName, ...rest}: PropsType) => {

    let buttonClasses = `${classes.button} ${classes[btnType as "green" | "red"]}`

    return (
            <button className={buttonClasses} {...rest}>
                {btnName}
            </button>
    )
})
