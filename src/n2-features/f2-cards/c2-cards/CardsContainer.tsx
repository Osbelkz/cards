import React, {useCallback, useEffect} from 'react';
import Cards from "./Cards";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {Preloader} from "../../../n1-main/m1-ui/common/Preloader/Preloader";
import {StatusType} from "../../../n1-main/m2-bll/reducers/app-reducer";
import {
    CardsSearchParamsType, changeCardsPageAC, changeCardsPageCountAC, createCardTC,
    deleteCardTC,
    getCardsTC, setCardsSearchParamsAC, setPackIdAC, updateCardTC
} from "../../../n1-main/m2-bll/reducers/cards-reducer";
import {CardType} from "../../../n1-main/m3-dal/cards-api";
import {useParams} from "react-router-dom";


const CardsContainer = React.memo(() => {

    console.log("cards container")

    const dispatch = useDispatch()
    const cards = useSelector<RootStateType, Array<CardType> | null>(state => state.cards.cards)
    const cardsPack_id = useSelector<RootStateType, string>(state => state.cards.cardsPack_id)
    const cardsPage = useSelector<RootStateType, number>(state => state.cards.page)
    const pageCount = useSelector<RootStateType, number>(state => state.cards.pageCount)
    const cardsTotalCount = useSelector<RootStateType, number>(state => state.cards.cardsTotalCount)
    const min = useSelector<RootStateType, number | undefined>(state => state.cards.minGrade)
    const max = useSelector<RootStateType, number | undefined>(state => state.cards.maxGrade)
    const userId = useSelector<RootStateType, string | undefined>(state => state.profile.userData?._id)
    const pageStatus = useSelector<RootStateType, StatusType>(state => state.cards.pageStatus)
    const searchParams = useSelector<RootStateType, CardsSearchParamsType>(state => state.cards.searchParams)


    let {packId} = useParams<{packId: string}>()
    if (cardsPack_id !== packId) {
        dispatch(setPackIdAC(packId))
    }

    const deleteCardHandler = useCallback((cardId: string) => {
        dispatch(deleteCardTC(cardId))
    }, [])
    const createCardHandler = useCallback((question: string) => {
        dispatch(createCardTC(question))
    }, [])
    const updateCardHandler = useCallback((cardId: string, question: string) => {
        dispatch(updateCardTC(cardId, question))
    }, [])
    const changePageHandler = useCallback((page: number) => {
        dispatch(changeCardsPageAC(page))
    }, [])
    const changePageCountHandler = useCallback((pageCount: number) => {
        dispatch(changeCardsPageCountAC(pageCount))
    }, [])
    const setSearchParamsHandler = useCallback((cardQuestion?: string, min?: number, max?: number) => {
        dispatch(setCardsSearchParamsAC(cardQuestion, min, max))
    }, [])

    useEffect(() => {
        dispatch(getCardsTC())
    }, [cardsPage, pageCount, searchParams, cardsPack_id])

    if (!cardsPack_id || !cards || pageStatus === "idle") {
        return <Preloader/>
    }
    return (
        <Cards cards={cards}
               userId={userId}
               page={cardsPage}
               min={min}
               max={max}
               pageCount={pageCount}
               searchParams={searchParams}
               cardsTotalCount={cardsTotalCount}
               createCard={createCardHandler}
               deleteCard={deleteCardHandler}
               updateCard={updateCardHandler}
               changePage={changePageHandler}
               changePageCount={changePageCountHandler}
               setSearchParams={setSearchParamsHandler}
               pageStatus={pageStatus}
        />
    );
})

export default CardsContainer;
