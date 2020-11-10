import React, {useCallback, useEffect, useState} from 'react';
import {CardType} from "../../../n1-main/m3-dal/cards-api";
import Practice from './Practice';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {useParams} from "react-router-dom";
import {getPracticeCardsTC, PracticeStateType, setPracticePackAC, updateGradeTC} from "../../../n1-main/m2-bll/reducers/practice-reducer";
import {Preloader} from "../../../n1-main/m1-ui/common/Preloader/Preloader";


const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    // console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}


const PracticeContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch()
    const {cards, cardsPack_id, cardIsLoading} = useSelector<RootStateType, PracticeStateType>(state => state.practice)
    const [card, setCard] = useState<CardType | null>(null)

    let {packId} = useParams<{ packId: string }>()
    if (cardsPack_id !== packId) {
        dispatch(setPracticePackAC(packId))
    }

    const gradeCardHandler = useCallback(async (cardId: string, grade: number) => {
        await dispatch(updateGradeTC({card_id: cardId, grade}))
    }, [])

    const onNextHandler = useCallback(() => {
        if (cards.length) setTimeout(setCard, 300, getCard(cards))
    }, [cards])


    useEffect(() => {
        dispatch(getPracticeCardsTC())
        return () => setCard(null)
    }, [cardsPack_id])

    useEffect(() => {
        if (cards.length) setTimeout(setCard, 300, getCard(cards))
        // return () => {
        //     console.log("set")
        //     setCard(null)
        // }
    },[cards])


    if (cardsPack_id !== packId || !card) {
        return <Preloader/>
    }

    return (
        <Practice card={card}
                  onNext={onNextHandler}
                  gradeCard={gradeCardHandler}
                  isLoading={cardIsLoading}
        />
    );
});

export default PracticeContainer;
