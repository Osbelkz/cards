import {RootStateType} from "../store";
import { StatusType } from "./app-reducer";
import {cardsApi, CardType, CreateCardType, UpdateCardType} from "../../m3-dal/cards-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    cardsPack_id: "" as string,
    cardsOwner: "",
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    page: 1,
    pageCount: 10,
    minGrade: 0,
    maxGrade: 0,
    pageStatus: "idle" as StatusType,
    searchParams: {
        cardQuestion: "",
        cardAnswer: "",
        sortCards: "",
        min: 0,
        max: 0,
    },
    errorText: ""
}

export const getCardsTC = createAsyncThunk<
    { cards: Array<CardType>, cardsTotalCount: number, minGrade: number, maxGrade: number, pageStatus: StatusType, page: number },
    { selectedPage?: number },
    { rejectValue: string, state: RootStateType }
    >("cards/getCards",
    async (arg, { rejectWithValue, getState}) => {
        const {cardsPack_id, page, pageCount, searchParams: {cardQuestion, min, max, sortCards}} = getState().cards
        try {
            const response = await cardsApi.getPack({
                cardsPack_id,
                page: arg.selectedPage || page,
                pageCount,
                cardQuestion,
                min,
                max,
                sortCards
            })
            return {cards: response.data.cards,
                cardsTotalCount: response.data.cardsTotalCount,
                minGrade: response.data.minGrade,
                maxGrade: response.data.maxGrade,
                pageStatus: "succeeded",
                page: arg.selectedPage || 1
            }
        } catch (e) {
            const error: { response: { data: { error: string } } } = e
            return rejectWithValue(error.response ? error.response.data.error : "unknown error")
        }
    })

export const deleteCardTC = createAsyncThunk<
    undefined,
    string,
    { rejectValue: string, state: RootStateType }
    >("cards/deleteCardTC",
    async (cardId, {rejectWithValue, dispatch}) => {
        try {
            await cardsApi.deleteCard(cardId)
            dispatch(getCardsTC({}))
        } catch (e) {
            const error: { response: { data: { error: string } } } = e
            return rejectWithValue(error.response ? error.response.data.error : "unknown error")
        }
    })

export const createCardTC = createAsyncThunk<
    undefined,
    CreateCardType,
    { rejectValue: string, state: RootStateType }
    >("cards/createCardTC",
    async (card, {rejectWithValue, getState, dispatch}) => {
        let {cardsPack_id} = getState().cards
        try {
            await cardsApi.createCard({...card, cardsPack_id: cardsPack_id})
            dispatch(getCardsTC({selectedPage: 1}))
        } catch (e) {
            const error: { response: { data: { error: string } } } = e
            return rejectWithValue(error.response ? error.response.data.error : "unknown error")
        }
    })

export const updateCardTC = createAsyncThunk<
    undefined,
    UpdateCardType,
    { rejectValue: string, state: RootStateType }
    >("cards/updateCardTC",
    async (card, {rejectWithValue, dispatch}) => {
        try {
            await cardsApi.updateCard(card)
            dispatch(getCardsTC({selectedPage: 1}))
        } catch (e) {
            const error: { response: { data: { error: string } } } = e
            return rejectWithValue(error.response ? error.response.data.error : "unknown error")
        }
    })

export const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        setPack: (state, action: PayloadAction<{cardsPack_id: string, cardsOwner: string}>) => {
            const {cardsPack_id, cardsOwner} = action.payload
            state.cardsPack_id = cardsPack_id
            state.cardsOwner = cardsOwner
        },
        changeCardsPage: (state, action: PayloadAction<{page: number}>) => {
            state.page = action.payload.page
        },
        changeCardsPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
            state.pageCount = action.payload.pageCount
        },
        setCardsSearchParams: (state, action: PayloadAction<{cardQuestion: string, min: number, max: number}>) => {
            const {cardQuestion, min, max} = action.payload
            state.searchParams.cardQuestion = cardQuestion
            state.searchParams.min = min
            state.searchParams.max = max
        },
        setCardsSortColumnParams: (state, action: PayloadAction<{ sortCards: string }>) => {
            state.searchParams.sortCards = action.payload.sortCards
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCardsTC.pending, (state, action) => {
                state.pageStatus = "loading"
            })
            .addCase(getCardsTC.fulfilled, (state, action) => {
                state.cards = action.payload.cards
                state.cardsTotalCount = action.payload.cardsTotalCount
                state.minGrade = action.payload.minGrade
                state.maxGrade = action.payload.maxGrade
                state.pageStatus = action.payload.pageStatus
                state.page = action.payload.page
            })
            .addCase(getCardsTC.rejected, (state, action) => {
                if (action.payload) {
                    state.pageStatus = "failed"
                    state.errorText = action.payload
                }
            })
            .addCase(deleteCardTC.pending, (state, action) => {
                state.pageStatus = "loading"
            })
            .addCase(deleteCardTC.fulfilled, (state, action) => {
                state.pageStatus = "succeeded"
            })
            .addCase(deleteCardTC.rejected, (state, action) => {
                if (action.payload) {
                    state.pageStatus = "failed"
                    state.errorText = action.payload
                }
            })
            .addCase(createCardTC.pending, (state, action) => {
                state.pageStatus = "loading"
            })
            .addCase(createCardTC.fulfilled, (state, action) => {
                state.pageStatus = "succeeded"
            })
            .addCase(createCardTC.rejected, (state, action) => {
                if (action.payload) {
                    state.pageStatus = "failed"
                    state.errorText = action.payload
                }
            })
            .addCase(updateCardTC.pending, (state, action) => {
                state.pageStatus = "loading"
            })
            .addCase(updateCardTC.fulfilled, (state, action) => {
                state.pageStatus = "succeeded"
            })
            .addCase(updateCardTC.rejected, (state, action) => {
                if (action.payload) {
                    state.pageStatus = "failed"
                    state.errorText = action.payload
                }
            })
    }
})

export const {setPack, changeCardsPage, changeCardsPageCount, setCardsSearchParams, setCardsSortColumnParams} = cardsSlice.actions

export type CardsStateType = typeof initialState
export type CardsSearchParamsType = typeof initialState.searchParams
