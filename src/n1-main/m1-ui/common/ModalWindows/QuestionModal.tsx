import React, {useState} from "react";
import classes from "./QuestionModal.module.scss";
import {Button} from "../Button/Button";

type QuestionModalPropsType = {
    text: string
    answer: string
    setAnswer: (value: string) => void
    active: boolean
    setActive: (value: boolean) => void
}

export const QuestionModal = (props: QuestionModalPropsType) => {
    const onYesClickHandler = () => {
        props.setAnswer("Yes")
        props.setActive(false)
    }
    const onNoClickHandler = () => {
        props.setAnswer("No")
        props.setActive(false)
    }

    return <div className={props.active ? `${classes.modal} ${classes.active}` : classes.modal} onClick={() => props.setActive(false)}>
        <div
            className={props.active ? `${classes.modalContent} ${classes.modalContentActive}` : classes.modalContent}
            onClick={e => e.stopPropagation()}
        >
            {props.text}
            <Button btnName={"Yes"} onClick={onYesClickHandler} style={{right: "10px"}}/>
            <Button btnName={"No"} onClick={onNoClickHandler} style={{left: "10px"}}/>
        </div>
    </div>
}