import {Dispatch} from "redux";
import {RootStateType} from "../store";
import { StatusType } from "./app-reducer";
import {cardsApi, CardType, GradeType} from "../../m3-dal/cards-api";
import {ThunkDispatch} from "redux-thunk";

enum ACTION_TYPES {
    SET_CARDS = "practice/SET_CARDS",
    SET_IS_LOADING = "practice/SET_IS_LOADING",
    SET_PACK_ID = "practice/SET_PACK_ID",
    SET_CARD_IS_LOADING = "practice/SET_CARD_IS_LOADING",
    UPDATE_GRADE = "practice/UPDATE_GRADE",
}


const initialState = {
    cardsPack_id: "" as string,
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    pageStatus: "idle" as StatusType,
    cardIsLoading: false,
}

export const practiceReducer = (state: PracticeStateType = initialState, action: ActionsType): PracticeStateType => {
    switch (action.type) {
        case ACTION_TYPES.SET_IS_LOADING:
        case ACTION_TYPES.SET_PACK_ID:
        case ACTION_TYPES.SET_CARDS:
        case ACTION_TYPES.SET_CARD_IS_LOADING:
            return {
                ...state, ...action.payload,
            }

        case ACTION_TYPES.UPDATE_GRADE:
            return {
                ...state,
                cards: state.cards.map(
                    card => card._id === action.payload.card_id ? {...card, ...action.payload} : card
                )
            }
        default:
            return state
    }
}


// action creators


const setPracticeCardsAC = (cards: Array<CardType>, cardsTotalCount: number, pageStatus: StatusType) => {
    return {type: ACTION_TYPES.SET_CARDS, payload: {cards, cardsTotalCount, pageStatus}} as const
}
export const setPracticePageStatus = (pageStatus: StatusType) => {
    return {type: ACTION_TYPES.SET_IS_LOADING, payload: {pageStatus}} as const
}
export const setPracticePackAC = (cardsPack_id: string) => {
    return {type: ACTION_TYPES.SET_PACK_ID, payload: {cardsPack_id}} as const
}
export const setCardIsLoadingAC = (cardIsLoading: boolean) => {
    return {type: ACTION_TYPES.SET_CARD_IS_LOADING, payload: {cardIsLoading}} as const
}
export const updateCardGradeAC = (card_id: string, grade: number, shots: number) => {
    return {type: ACTION_TYPES.UPDATE_GRADE, payload: {card_id, grade, shots}} as const
}


// thunks

export const getPracticeCardsTC = () => async (dispatch: Dispatch, getState: () => RootStateType) => {
    const {cardsPack_id} = getState().practice
    dispatch(setPracticePageStatus("loading"))
    try {
        const response = await cardsApi.getPack({cardsPack_id, pageCount: 200})
        dispatch(setPracticeCardsAC(response.data.cards, response.data.cardsTotalCount, "succeeded"))
    } catch (e) {
        dispatch(setPracticePageStatus("failed"))
    } finally {

    }
}

export const updateGradeTC = (card: GradeType) =>
    async (dispatch: ThunkDispatch<RootStateType, {}, ActionsType>) => {
        dispatch(setCardIsLoadingAC(true))
        dispatch(setPracticePageStatus("loading"))
        try {
            const response = await cardsApi.gradeCard(card)
            let {data: {updatedGrade: {card_id, grade, shots}}} = response
            dispatch(updateCardGradeAC(card_id, grade, shots))
            dispatch(setCardIsLoadingAC(false))
            dispatch(setPracticePageStatus("succeeded"))
        } catch (e) {

        }
    }

export type PracticeStateType = typeof initialState


type ActionsType = ReturnType<typeof setPracticePageStatus>
    | ReturnType<typeof setPracticeCardsAC>
    | ReturnType<typeof setPracticePackAC>
    | ReturnType<typeof setCardIsLoadingAC>
    | ReturnType<typeof updateCardGradeAC>
