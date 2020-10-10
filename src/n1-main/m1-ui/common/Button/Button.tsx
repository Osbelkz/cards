import React from "react";
import classes from "./Button.module.css";

type PropsType = {
    onClick: () => void
    btnName: string
    disabled?: boolean
    btnType?: "green" | "red"
}

export const Button = React.memo(({onClick, btnType, btnName, disabled}: PropsType) => {

    let buttonClasses = `${classes.button} ${classes[btnType as "green" | "red"]}`

    return (
            <button className={buttonClasses}
                    disabled={disabled}
                    onClick={onClick}>
                {btnName}
            </button>
    )
})
