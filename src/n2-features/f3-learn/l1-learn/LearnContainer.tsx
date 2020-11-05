import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {CardsStateType, getCardsTC, setPackAC} from "../../../n1-main/m2-bll/reducers/cards-reducer";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {CardType} from "../../../n1-main/m3-dal/cards-api";
import Learn from './Learn';


const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}


const LearnContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch()
    const {cards, cardsPack_id} = useSelector<RootStateType, CardsStateType>(state => state.cards)

    let {packId} = useParams<{packId: string}>()
    if (cardsPack_id !== packId) {
        dispatch(setPackAC(packId, ""))
    }

    const [card, setCard] = useState<CardType>({} as CardType);
    const [first, setFirst] = useState<boolean>(true);

    const onNext = useCallback(() => {
        if (cards.length > 0) {
            setCard(getCard(cards));
        }
    }, [cards])


    useEffect(() => {
        if (first) {
            dispatch(getCardsTC(undefined, 100))
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards));
        console.log("useEffect learn", cards)
        // return () => setCard({} as CardType)
    }, [cardsPack_id, cards, first])


    return (
        <Learn card={card} onNext={onNext} />
    );
});

export default LearnContainer;