import React, {useState} from "react";
import {OneInputModal} from "./OneInputModal";


type InputModalContainerType = {
    title: string
    placeholder: string
    active: boolean
    setActive: (value: boolean) => void
    handleOnSubmit: (itemName: string) => void
}

export const OneInputModalContainer: React.FC<InputModalContainerType> = ({title, placeholder, active, setActive, handleOnSubmit}) => {
    return <OneInputModal
            title={title}
            placeholder={placeholder}
            active={active}
            setActive={setActive}
            handleOnSubmit={handleOnSubmit}/>
}