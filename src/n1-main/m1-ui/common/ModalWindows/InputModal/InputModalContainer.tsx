import React, {useState} from "react";
import {InputModal} from "./InputModal";

type InputModalContainerType = {
    text: string
}

export const InputModalContainer: React.FC<InputModalContainerType> = ({text}) => {
    const [active, setActive] = useState(false)

    return <>
        <button onClick={() => setActive(true)}>Input modal</button>
        {/*{`question: ${question}, answer: ${answer}, comment: ${comment}`}*/}
        <InputModal
            text={text}
            active={active}
            setActive={setActive}
            handleOnSubmit={(question, answer, comment) => alert(question + answer + comment)}
        />
    </>
}