import React, {useCallback, useEffect} from 'react';
import Cards from "./Cards";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {Preloader} from "../../../n1-main/m1-ui/common/Preloader/Preloader";
import {
    CardsStateType,
    changeCardsPageAC, changeCardsPageCountAC, createCardTC,
    deleteCardTC,
    getCardsTC, setCardsSearchParamsAC, setCardsSortColumnParamsAC, setPackAC, updateCardTC
} from "../../../n1-main/m2-bll/reducers/cards-reducer";
import {useParams} from "react-router-dom";


const CardsContainer = React.memo(() => {

    // console.log("cards container")

    const dispatch = useDispatch()
    const {
        cards, cardsOwner, cardsPack_id, minGrade, maxGrade, page, pageCount, cardsTotalCount, pageStatus, searchParams
        } = useSelector<RootStateType, CardsStateType>(state => state.cards)
    const userId = useSelector<RootStateType, string | undefined>(state => state.profile.userData?._id)


    let {packId} = useParams<{packId: string}>()
    if (cardsPack_id !== packId) {
        dispatch(setPackAC(packId, ""))
    }
    // console.log(cardsOwner, userId)
    const deleteCardHandler = useCallback((cardId: string) => {
        dispatch(deleteCardTC(cardId))
    }, [])
    const createCardHandler = useCallback((question: string, answer: string) => {
        dispatch(createCardTC({question, answer}))
    }, [])
    const updateCardHandler = useCallback((cardId: string, question: string, answer: string) => {
        dispatch(updateCardTC({question, _id: cardId, answer}))
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
    const setSortColumnHandler = useCallback((sortCards: string) => {
        dispatch(setCardsSortColumnParamsAC(sortCards))
    }, [])

    useEffect(() => {
        dispatch(getCardsTC())

    }, [page, pageCount, searchParams, cardsPack_id])

    if (!cardsPack_id || !cards || pageStatus === "idle") {
        return <Preloader/>
    }
    return (
        <Cards cards={cards}
               page={page}
               owner={cardsOwner===userId}
               min={minGrade}
               max={maxGrade}
               pageCount={pageCount}
               searchParams={searchParams}
               cardsTotalCount={cardsTotalCount}
               createCard={createCardHandler}
               deleteCard={deleteCardHandler}
               updateCard={updateCardHandler}
               changePage={changePageHandler}
               setSortColumn={setSortColumnHandler}
               changePageCount={changePageCountHandler}
               setSearchParams={setSearchParamsHandler}
               pageStatus={pageStatus}
        />
    );
})

export default CardsContainer;
