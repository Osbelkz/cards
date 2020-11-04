import React, {useState} from "react";
import {QuestionModal} from "./QuestionModal";

type QuestionModalContainerPropsType = {
    text: string
}

export const QuestionModalContainer: React.FC<QuestionModalContainerPropsType> = ({text}) => {
    const [active, setActive] = useState(false)
    const [answer, setAnswer] = useState("")

    return <>
        <button onClick={() => setActive(true)}>Question modal</button>
        {answer}
        <QuestionModal
            text={text}
            answer={answer}
            setAnswer={setAnswer}
            active={active}
            setActive={setActive}
        />
    </>
}