import editSVG from "./Pencil-Outline.svg";
import React, {ButtonHTMLAttributes} from "react";
import classes from "./EditBTN.module.scss";

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnName?: string
}

const EditBTN: React.FC<PropsType> = (props) => {
    return <button className={classes.btn_edit} {...props}>
        <img src={editSVG} alt=""/>
    </button>;
}

export default EditBTN
