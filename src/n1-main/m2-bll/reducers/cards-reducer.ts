import {Dispatch} from "redux";
import {RootStateType} from "../store";
import { StatusType } from "./app-reducer";
import {cardsApi, CardType, CreateCardType, UpdateCardType} from "../../m3-dal/cards-api";
import {ThunkDispatch} from "redux-thunk";

enum ACTION_TYPES {
    CHANGE_PAGE = "cards/CHANGE_PAGE",
    CHANGE_PAGE_COUNT = "cards/CHANGE_PAGE_COUNT",
    SET_CARDS = "cards/SET_CARDS",
    SET_SEARCH_NAME = "cards/SET_SEARCH_NAME",
    SET_SEARCH_PARAMS = "cards/SET_SEARCH_PARAMS",
    SET_IS_LOADING = "cards/SET_IS_LOADING",
    SET_PACK_ID = "cards/SET_PACK_ID",
    SET_SORT_COLUMN = "cards/SET_SORT_COLUMN",
}


const initialState = {
    cardsPack_id: "" as string,
    cardsOwner: "",
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    page: 1,
    pageCount: 10,
    minGrade: undefined as undefined | number,
    maxGrade: undefined as undefined | number,
    pageStatus: "idle" as StatusType,
    searchParams: {
        cardQuestion: "" as undefined | string,
        cardAnswer: "" as undefined | string,
        sortCards: "" as undefined | string,
        min: undefined as undefined | number,
        max: undefined as undefined | number,
    }
}

export const cardsReducer = (state: CardsStateType = initialState, action: ActionsType): CardsStateType => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_PAGE:
        case ACTION_TYPES.CHANGE_PAGE_COUNT:
        case ACTION_TYPES.SET_IS_LOADING:
        case ACTION_TYPES.SET_PACK_ID:
        case ACTION_TYPES.SET_CARDS:
            return {
                ...state, ...action.payload,
            }
        case ACTION_TYPES.SET_SEARCH_NAME:
            return {
                ...state, searchParams: {...state.searchParams, cardQuestion: action.payload.question}
            }
        case ACTION_TYPES.SET_SEARCH_PARAMS:
        case ACTION_TYPES.SET_SORT_COLUMN:
            return {
                ...state, searchParams: {...state.searchParams, ...action.payload}
            }
        default:
            return state
    }
}


// actions

export const changeCardsPageAC = (page: number) => {
    return {type: ACTION_TYPES.CHANGE_PAGE, payload: {page}} as const
}
export const changeCardsPageCountAC = (pageCount: number) => {
    return {type: ACTION_TYPES.CHANGE_PAGE_COUNT, payload: {pageCount}} as const
}
const setCardsAC = (cards: Array<CardType>, cardsTotalCount: number, minGrade: number, maxGrade: number, pageStatus: StatusType) => {
    return {type: ACTION_TYPES.SET_CARDS, payload: {cards, cardsTotalCount, minGrade, maxGrade, pageStatus}} as const
}
export const setCardsSearchQuestionAC = (question: string) => {
    return {type: ACTION_TYPES.SET_SEARCH_NAME, payload: {question}} as const
}
export const setCardsSearchParamsAC = (cardQuestion?: string, min?: number, max?: number) => {
    return {type: ACTION_TYPES.SET_SEARCH_PARAMS, payload: {cardQuestion, min, max}} as const
}
export const setCardsPageStatus = (pageStatus: StatusType) => {
    return {type: ACTION_TYPES.SET_IS_LOADING, payload: {pageStatus}} as const
}
export const setPackAC = (cardsPack_id: string, cardsOwner: string) => {
    return {type: ACTION_TYPES.SET_PACK_ID, payload: {cardsPack_id, cardsOwner}} as const
}
export const setCardsSortColumnParamsAC = (sortCards: string) => {
    return {type: ACTION_TYPES.SET_SORT_COLUMN, payload: {sortCards}} as const
}


// thunks

export const getCardsTC = (selectedPage?: number, pageCountLearn?: number) => async (dispatch: Dispatch, getState: () => RootStateType) => {
    const {cardsPack_id, page, pageCount, searchParams: {cardQuestion, min, max, sortCards}} = getState().cards
    dispatch(setCardsPageStatus("loading"))
    try {
        const response = await cardsApi.getPack({
            cardsPack_id,
            page: selectedPage || page,
            pageCount: pageCountLearn || pageCount,
            cardQuestion,
            min,
            max,
            sortCards
        })
        console.log(response.data)
        dispatch(setCardsAC(response.data.cards,
            response.data.cardsTotalCount,
            response.data.minGrade,
            response.data.maxGrade,
            "succeeded"))
        selectedPage && dispatch(changeCardsPageAC(selectedPage))
        // console.log(getState().cards)
    } catch (e) {
        // console.log("get packs tc")
        alert(e.response.data.error)
        dispatch(setCardsPageStatus("failed"))
    } finally {

    }
}

export const deleteCardTC = (cardId: string) =>
    async (dispatch: ThunkDispatch<RootStateType, {}, ActionsType>) => {
    dispatch(setCardsPageStatus("loading"))
    try {
        const response = await cardsApi.deleteCard(cardId)
        dispatch(getCardsTC())
    } catch (e) {
        alert(e.response.data.error)
        dispatch(setCardsPageStatus("failed"))
    }
}
export const createCardTC = (card: CreateCardType) =>
    async (dispatch: ThunkDispatch<RootStateType, {}, ActionsType>, getState: () => RootStateType) => {
    dispatch(setCardsPageStatus("loading"))
    let {cardsPack_id} = getState().cards
    try {
        const response = await cardsApi.createCard({...card, cardsPack_id})
        dispatch(getCardsTC(1))
    } catch (e) {
        // console.log("create tc")
        alert(e.response.data.error)
        dispatch(setCardsPageStatus("failed"))
    }
}
//under construction
export const updateCardTC = (card: UpdateCardType) =>
    async (dispatch: ThunkDispatch<RootStateType, {}, ActionsType>) => {
    dispatch(setCardsPageStatus("loading"))
    try {
        const response = await cardsApi.updateCard(card)
        dispatch(getCardsTC(1))
    } catch (e) {
        alert(e.response.data.error)
        dispatch(setCardsPageStatus("failed"))
    }
}

export type CardsStateType = typeof initialState
export type CardsSearchParamsType = typeof initialState.searchParams


type ActionsType = ReturnType<typeof changeCardsPageAC>
    | ReturnType<typeof changeCardsPageCountAC>
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCardsSearchQuestionAC>
    | ReturnType<typeof setCardsSearchParamsAC>
    | ReturnType<typeof setCardsPageStatus>
    | ReturnType<typeof setPackAC>
    | ReturnType<typeof setCardsSortColumnParamsAC>

