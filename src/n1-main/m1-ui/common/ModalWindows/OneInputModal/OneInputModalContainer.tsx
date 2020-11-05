import React, {useState} from "react";
import {OneInputModal} from "./OneInputModal";


type InputModalContainerType = {
    text: string
    placeholder: string
}

export const OneInputModalContainer: React.FC<InputModalContainerType> = ({text, placeholder}) => {
    const [active, setActive] = useState(false)

    return <>
        <button onClick={() => setActive(true)}>OneInput modal</button>
        {/*{`question: ${question}, answer: ${answer}, comment: ${comment}`}*/}
        <OneInputModal
            text={text}
            placeholder={placeholder}
            active={active}
            setActive={setActive}
            handleOnSubmit={(itemName) => alert(itemName)}
        />
    </>
}