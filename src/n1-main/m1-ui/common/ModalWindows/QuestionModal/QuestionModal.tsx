import React from "react";
import classes from "./QuestionModal.module.scss";
import {Modal} from "../Modal";
import {TableButton} from "../../Table/TableButton/TableButton";

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
            <TableButton btnName={"Yes"} onClick={onYesClickHandler} style={{right: "20px"}}/>
            <TableButton btnName={"No"} onClick={onNoClickHandler} style={{left: "20px"}}/>
        </Modal>
    </div>
}
