import trainSVG from "./Fitness_Fill.svg";
import React, {ButtonHTMLAttributes} from "react";
import classes from "./TrainBTN.module.scss";

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnName?: string
}

const TrainBTN: React.FC<PropsType> = (props) => {
    return <button className={classes.btn_train} {...props}>
        <img src={trainSVG} alt=""/>
    </button>;
}

export default TrainBTN
