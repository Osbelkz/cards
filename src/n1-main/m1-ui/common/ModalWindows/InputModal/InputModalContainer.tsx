import React from "react";
import {InputModal} from "./InputModal";

type InputModalContainerType = {
    text: string
    setActive: (value: boolean) => void
    active: boolean
    createCard: (question: string, answer: string) => void
}

export const InputModalContainer: React.FC<InputModalContainerType> = ({text, setActive, active, createCard}) => {

    return <>
        <InputModal
            text={text}
            active={active}
            setActive={setActive}
            handleOnSubmit={(question, answer, comment) => createCard(question, answer)}/>
    </>
}
