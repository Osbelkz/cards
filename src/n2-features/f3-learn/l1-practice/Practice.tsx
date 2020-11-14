import React, {useState} from "react";

import {CardType} from "../../../n1-main/m3-dal/cards-api";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import classes from "./Practice.module.scss";



const grades = ["1", "2", "3", "4", "5"];

type PropsType = {
    card: CardType
    gradeCard: (cardId: string, grade: number) => void
    isLoading: boolean
    onNext: () => void
}

const Practice: React.FC<PropsType> = React.memo(({card, isLoading, gradeCard, onNext}) => {

    const [isChecked, setIsChecked] = useState(false)

    const onGradeButtonHandler = async (grade: number) => {
        await gradeCard(card._id, grade)
        setIsChecked(false)
    }

    const onNextHandler = () => {
        onNext()
        setIsChecked(false)
    }

    return (
        <div className={classes.practice}>
            <div className={classes.practice__container}>
                <div className={classes.card}>
                    <div style={isChecked ? {transform: "rotateX(180deg)"} : {}} className={classes.card__inner}>
                        <div className={classes.card__front}
                             onClick={() => setIsChecked(true)}>
                            <div className={classes.card__text}>
                                <div>{card.question}</div>
                            </div>

                        </div>
                        <div className={classes.card__back}>
                            <div className={classes.card__text} onClick={()=>setIsChecked(false)}>
                                <div>{card.answer}</div>
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

export default Practice;
