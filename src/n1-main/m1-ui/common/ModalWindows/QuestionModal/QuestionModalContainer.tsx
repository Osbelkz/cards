import React from "react";
import {QuestionModal} from "./QuestionModal";

type QuestionModalContainerPropsType = {
    text: string
    activate: boolean
    setActivate: (value: boolean) => void
    setAnswerY: (value: boolean) => void
    setAnswerN: (value: boolean) => void
}

export const QuestionModalContainer: React.FC<QuestionModalContainerPropsType> = ({text, setAnswerY, setAnswerN, activate, setActivate}) => {
    return <>
        <QuestionModal
            text={text}
            setAnswerY={setAnswerY}
            setAnswerN={setAnswerN}
            active={activate}
            setActive={setActivate}
        />
    </>
}
