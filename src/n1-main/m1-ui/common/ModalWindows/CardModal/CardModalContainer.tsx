import React, {useState} from "react";
import {CardModal} from "./CardModal";

type CardModalContainerPropsType = {
    question: string
    answer: string
}

export const CardModalContainer: React.FC<CardModalContainerPropsType> = ({question, answer}) => {
    const [active, setActive] = useState(false)

    return <>
        <button onClick={() => setActive(true)}>Card modal</button>
        <CardModal
            question={question}
            answer={answer}
            active={active}
            setActive={setActive}
        />
    </>
}