import React, {useCallback} from "react";
import classes from "./Input.module.css";
import {KeyboardEvent} from "react";

type PropsType = {
    onChange: (text: string) => void
    disabled?: boolean
    value: string
    addData?: () => void
    error?: boolean
    placeHolder?: string
    autoFocus?: boolean
    onBlur?: ()=>void
}

export const Input = React.memo( (props: PropsType) => {

    const onPressEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addData && props.addData()
        }
    }, [props.addData])

    return (
        <>
            <div className={classes.input}>
                <input type="text"
                       onBlur={props.onBlur}
                       autoFocus={props.autoFocus}
                       placeholder={props.placeHolder}
                       className={props.error ? `${classes.input__elem} ${classes.error}` : classes.input__elem}
                       onChange={e => props.onChange(e.currentTarget.value)}
                       onKeyPress={onPressEnter}
                       value={props.value}
                       disabled={props.disabled}/>
                {/*<div className={props.error ? classes.input__error : ""}>{props.error}</div>*/}
            </div>


        </>
    )
})
