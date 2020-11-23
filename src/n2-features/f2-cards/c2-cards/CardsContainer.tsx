import React, {useCallback, useEffect} from 'react';
import Cards from "./Cards";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {Preloader} from "../../../n1-main/m1-ui/common/Preloader/Preloader";
import {
    CardsStateType,
    changeCardsPage,
    changeCardsPageCount,
    createCardTC,
    deleteCardTC,
    getCardsTC,
    setCardsSearchParams,
    setCardsSortColumnParams,
    setPack,
    updateCardTC
} from "../../../n1-main/m2-bll/reducers/cards-reducer";
import {useParams} from "react-router-dom";


const CardsContainer = React.memo(() => {

    const dispatch = useDispatch()
    const {
        cards, cardsOwner, cardsPack_id, minGrade, maxGrade, page, pageCount, cardsTotalCount, pageStatus, searchParams
        } = useSelector<RootStateType, CardsStateType>(state => state.cards)
    const userId = useSelector<RootStateType, string | undefined>(state => state.profile.userData?._id)


    let {packId} = useParams<{packId: string}>()
    if (cardsPack_id !== packId) {
        dispatch(setPack({cardsPack_id: packId, cardsOwner: ""}))
    }
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
        dispatch(changeCardsPage({page}))
    }, [])
    const changePageCountHandler = useCallback((pageCount: number) => {
        dispatch(changeCardsPageCount({pageCount}))
    }, [])
    const setSearchParamsHandler = useCallback((cardQuestion: string, min: number, max: number) => {
        dispatch(setCardsSearchParams({cardQuestion, min, max}))
    }, [])
    const setSortColumnHandler = useCallback((sortCards: string) => {
        dispatch(setCardsSortColumnParams({sortCards}))
    }, [])

    useEffect(() => {
        dispatch(getCardsTC({}))

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
