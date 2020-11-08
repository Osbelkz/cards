import React from "react";

import {CardType} from "../../../n1-main/m3-dal/cards-api";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import classes from "./Learn.module.scss";



const grades = ["1", "2", "3", "4", "5"];

type PropsType = {
    card: CardType
    onNext: () => void
    flipCard: (value: boolean) => void
    gradeCard: (cardId: string, grade: number) => void
    isLoading: boolean
    isChecked: boolean
}

const Learn: React.FC<PropsType> = React.memo(({card, onNext, gradeCard, isLoading, isChecked, flipCard}) => {

    console.log(card)

    const onGradeButtonHandler = (grade: number) => {
        gradeCard(card._id, grade)
    }

    const onNextHandler = () => {
        onNext()
    }

    return (
        <div className={classes.learn}>
            <div className={classes.learn__container}>
                <div className={classes.card}>
                    <div style={isChecked ? {transform: "rotateX(180deg)"} : {}} className={classes.card__inner}>
                        <div className={classes.card__front}
                             onClick={() => flipCard(true)}>
                            <div className={classes.card__text}>
                                <p>{card.question}</p>
                            </div>

                        </div>
                        <div className={classes.card__back}>
                            <div className={classes.card__text}>
                                <p>{card.answer}</p>
                            </div>

                            <div className={classes.card__back_bottom}>
                                {grades.map((g, i) => (
                                    <Button onClick={() => onGradeButtonHandler(i+1)}
                                            key={'grade-' + i}
                                            disabled={isLoading}
                                            btnName={g}/>
                                ))}

                                <div className={classes.card__next_btn} onClick={onNextHandler}>next</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
);
})

export default Learn;
