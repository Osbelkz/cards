import React, {ButtonHTMLAttributes} from "react";
import editSVG from "../../../../../n3-assets/Pencil-Outline.svg";
import openSVG from "../../../../../n3-assets/Folder-Outline.svg";
import trainSVG from "../../../../../n3-assets/Fitness_Fill.svg";
import removeSVG from "../../../../../n3-assets/Trash-Outline.svg";
import classes from "./GeneralBTN.module.scss";

interface GeneralBTNPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnType: "edit" | "open" | "train" | "remove"
}

export const GeneralBTN: React.FC<GeneralBTNPropsType> = React.memo(({btnType, ...props}) => {
    let svg = ""
    let buttonClasses = ""

    switch (btnType) {
        case "edit":
            svg = editSVG
            buttonClasses = `${classes.button}`
            break
        case "open": {
            svg = openSVG
            buttonClasses = `${classes.button}`
            break
        }
        case "train": {
            svg = trainSVG
            buttonClasses = `${classes.button} ${classes.green}`
            break
        }
        case "remove": {
            svg = removeSVG
            buttonClasses = `${classes.button} ${classes.red}`
            break
        }
    }

    return <button className={buttonClasses} {...props}>
        <img src={svg} alt=""/>
    </button>;
})