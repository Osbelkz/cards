import React, {useState} from "react";
import {SimpleModal} from "./SimpleModal";

type SimpleModalContainerType = {
    text: string
}

export const SimpleModalContainer: React.FC<SimpleModalContainerType> = ({text}) => {
    const [active, setActive] = useState(false)

    return <>
        <button onClick={() => setActive(true)}>Simple modal</button>
        <SimpleModal text={text} active={active} setActive={setActive}/>
    </>
}