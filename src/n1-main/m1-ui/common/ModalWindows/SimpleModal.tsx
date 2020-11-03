import React, {useState} from "react";
import classes from "./SimpleModal.module.scss";
import {Button} from "../Button/Button";

type SimpleModalPropsType = {
    text: string
    active: boolean
    setActive: (value: boolean) => void
}

export const SimpleModal = (props: SimpleModalPropsType) => {


    return <div className={props.active ? `${classes.modal} ${classes.active}` : classes.modal} onClick={() => props.setActive(false)}>
        <div
            className={props.active ? `${classes.modalContent} ${classes.modalContentActive}` : classes.modalContent}
            onClick={e => e.stopPropagation()}
        >
            {props.text}
            <Button btnName={"X"} onClick={() => props.setActive(false)}/>
        </div>
    </div>
}