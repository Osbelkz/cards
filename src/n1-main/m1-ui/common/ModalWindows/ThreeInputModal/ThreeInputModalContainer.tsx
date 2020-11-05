import React from "react";
import {ThreeInputModal} from "./ThreeInputModal";

type InputModalContainerType = {
    active: boolean
    setActive: (value: boolean) => void
    title: string
    firstInputValue?: string
    secondInputValue?: string
    thirdInputValue?: string
    handleOnSubmit: (question: string, answer: string, comment: string) => void
}

export const ThreeInputModalContainer: React.FC<InputModalContainerType> = ({title, firstInputValue, secondInputValue, thirdInputValue, active, setActive, handleOnSubmit}) => {

    // console.log(firstInputValue, secondInputValue, thirdInputValue)

    return <ThreeInputModal
            title={title}
            firstInputValue={firstInputValue}
            secondInputValue={secondInputValue}
            thirdInputValue={thirdInputValue}
            active={active}
            setActive={setActive}
            handleOnSubmit={handleOnSubmit}/>
}
