import openSVG from "./Folder-Outline.svg";
import React, {ButtonHTMLAttributes} from "react";
import classes from "./OpenBTN.module.scss";

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnName?: string
}

const OpenBTN: React.FC<PropsType> = (props) => {
    return <button className={classes.btn_open} {...props}>
        <img src={openSVG} alt=""/>
    </button>;
}

export default OpenBTN
