import React, {useState} from "react";
import classes from "./QuestionModal.module.scss";
import {Button} from "../../Button/Button";
import {Modal} from "../Modal";

type QuestionModalPropsType = {
    text: string
    setAnswerY: (value: boolean) => void
    setAnswerN: (value: boolean) => void
    active: boolean
    setActive: (value: boolean) => void
}

export const QuestionModal: React.FC<QuestionModalPropsType> = ({text, setAnswerY, setAnswerN, active, setActive}) => {
    const onYesClickHandler = () => {
        setAnswerY(true)
        setActive(false)
    }
    const onNoClickHandler = () => {
        setAnswerN(false)
        setActive(false)
    }

    return <div className={classes.questionModal}>
        <Modal active={active} setActive={setActive}>
            {text}
            <Button btnName={"Yes"} onClick={onYesClickHandler} style={{right: "10px"}}/>
            <Button btnName={"No"} onClick={onNoClickHandler} style={{left: "10px"}}/>
        </Modal>
    </div>
}
