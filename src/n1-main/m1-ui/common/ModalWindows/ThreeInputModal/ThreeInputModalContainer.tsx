import React, {useState} from "react";
import {ThreeInputModal} from "./ThreeInputModal";

type InputModalContainerType = {
    title: string
    firstInputValue?: string
    secondInputValue?: string
    thirdInputValue?: string
}

export const ThreeInputModalContainer: React.FC<InputModalContainerType> = ({title, firstInputValue, secondInputValue, thirdInputValue}) => {
    const [active, setActive] = useState(false)

    return <>
        <button onClick={() => setActive(true)}>ThreeInput modal</button>
        {/*{`question: ${question}, answer: ${answer}, comment: ${comment}`}*/}
        <ThreeInputModal
            title={title}
            firstInputValue={firstInputValue}
            secondInputValue={secondInputValue}
            thirdInputValue={thirdInputValue}
            active={active}
            setActive={setActive}
            handleOnSubmit={(question, answer, comment) => alert(question + answer + comment)}
        />
    </>
}