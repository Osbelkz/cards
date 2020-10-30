import React, { ButtonHTMLAttributes } from "react";
import classes from "./TableButton.module.scss";

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnName: string
    btnType?: "green" | "red"
}

export const TableButton = React.memo(({btnType, btnName, ...rest}: PropsType) => {

    let buttonClasses = `${classes.button} ${classes[btnType as "green" | "red"]}`

    return (
            <button className={buttonClasses} {...rest}>
                {btnName}
            </button>
    )
})
