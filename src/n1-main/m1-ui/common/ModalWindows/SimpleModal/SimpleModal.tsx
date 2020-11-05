import React from "react";
import classes from "./SimpleModal.module.scss";
import {Button} from "../../Button/Button";
import {Modal} from "../Modal";

type SimpleModalPropsType = {
    text: string
    active: boolean
    setActive: (value: boolean) => void
}

export const SimpleModal: React.FC<SimpleModalPropsType> = ({text, active, setActive}) => {
    return <div className={classes.simpleModal}>
        <Modal active={active} setActive={setActive}>
            {text}
            <Button btnName={"X"} onClick={() => setActive(false)}/>
        </Modal>
    </div>
}