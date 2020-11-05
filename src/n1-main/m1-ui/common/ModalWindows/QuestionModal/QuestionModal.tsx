import React, {useState} from "react";
import classes from "./QuestionModal.module.scss";
import {Button} from "../../Button/Button";
import {Modal} from "../Modal";

type QuestionModalPropsType = {
    text: string
    answer: string
    setAnswer: (value: string) => void
    active: boolean
    setActive: (value: boolean) => void
}

export const QuestionModal: React.FC<QuestionModalPropsType> = ({text, answer, setAnswer, active, setActive}) => {
    const onYesClickHandler = () => {
        setAnswer("Yes")
        setActive(false)
    }
    const onNoClickHandler = () => {
        setAnswer("No")
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