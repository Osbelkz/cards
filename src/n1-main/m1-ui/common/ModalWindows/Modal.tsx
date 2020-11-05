import React from "react";
import classes from "./Modal.module.scss";

type ModalPropsType = {
    active: boolean
    setActive: (value: boolean) => void
}

export const Modal: React.FC<ModalPropsType> = ({active, setActive, children}) => {
    return <div className={active ? `${classes.modal} ${classes.active}` : classes.modal} onClick={() => setActive(false)}>
        <div
            className={active ? `${classes.modalContent} ${classes.modalContentActive}` : classes.modalContent}
            onClick={e => e.stopPropagation()}
        >
            {children}
        </div>
    </div>
}