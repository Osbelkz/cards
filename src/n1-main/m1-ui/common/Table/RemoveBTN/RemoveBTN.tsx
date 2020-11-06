import removeSVG from "./Trash-Outline.svg";
import React, {ButtonHTMLAttributes} from "react";
import classes from "./RemoveBTN.module.scss";

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnName?: string
}

const RemoveBTN: React.FC<PropsType> = (props) => {
    return <button className={classes.btn_remove} {...props}>
        <img src={removeSVG} alt=""/>
    </button>;
}

export default RemoveBTN
