import React, {useState, MouseEvent} from "react";

import {CardType} from "../../../n1-main/m3-dal/cards-api";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import classes from "./Learn.module.scss";


const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];


type PropsType = {
    card: CardType
    onNext: () => void
}

const Learn: React.FC<PropsType> = ({card}) => {

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const onNextHandler = () => {
        setIsChecked(false);
        onNext()
    }

    return (
        <div>
            LearnPage

    return (
        <div className={classes.learn}>
            <div className={classes.learn__container}>
                <div className={classes.card}>
                    <div style={isChecked ? {transform: "rotateY(180deg)"} : {}} className={classes.card__inner}>
                        <div className={classes.card__front}
                             onClick={() => setIsChecked(true)}>
                            <p>{card.question}</p>
            </div>
                        <div className={classes.card__back}>
                            <p>{card.answer}</p>
                <>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                                <Button key={'grade-' + i}
                                        btnName={g}
                    ))}

                            <div><div className={classes.card__next_btn} onClick={onNextHandler}>next</div></div>
                        </div>
                    </div>
        </div>
            </div>
        </div>
    );
})

export default Learn;
