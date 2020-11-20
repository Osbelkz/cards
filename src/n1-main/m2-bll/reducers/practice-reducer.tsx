import {RootStateType} from "../store";
import {StatusType} from "./app-reducer";
import {cardsApi, CardType, GradeType} from "../../m3-dal/cards-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type PracticeStateType = typeof initialState

const initialState = {
    cardsPack_id: "" as string,
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    pageStatus: "idle" as StatusType,
    cardIsLoading: false,
    errorText: ""
}

export const getPracticeCards = createAsyncThunk<
    { cards: CardType[], cardsTotalCount: number },
    undefined,
    { rejectValue: string, state: RootStateType }
    >("practice/getPracticeCards",
    async (arg, {rejectWithValue, getState}) => {
        const {cardsPack_id} = getState().practice
        try {
            const response = await cardsApi.getPack({cardsPack_id, pageCount: 200})
            return {cards: response.data.cards, cardsTotalCount: response.data.cardsTotalCount}
        } catch (e) {
            const error: { response: { data: { error: string } } } = e
            return rejectWithValue(error.response ? error.response.data.error : "unknown error")
        }
    })

export const updateGrade = createAsyncThunk<
    { card_id: string, grade: number, shots: number },
    GradeType,
    { rejectValue: string }
    >("practice/updateGrade",
    async (card: GradeType, {rejectWithValue}) => {
        try {
            const response = await cardsApi.gradeCard(card)
            let {data: {updatedGrade: {card_id, grade, shots}}} = response
            return {card_id, grade, shots}
        } catch (e) {
            const error: { response: { data: { error: string } } } = e
            return rejectWithValue(error.response ? error.response.data.error : "unknown error")
        }
    })

export const practiceSlice = createSlice({
    name: "practice",
    initialState,
    reducers: {
        setPracticePackId: (state, action: PayloadAction<{ cardsPack_id: string }>) => {
            state.cardsPack_id = action.payload.cardsPack_id
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPracticeCards.pending, (state, action) => {
                state.pageStatus = "loading"
            })
            .addCase(getPracticeCards.fulfilled, (state, action) => {
                state.cards = action.payload.cards
                state.cardsTotalCount = action.payload.cardsTotalCount
                state.pageStatus = "succeeded"
            })
            .addCase(getPracticeCards.rejected, (state, action) => {
                if (action.payload) {
                    state.pageStatus = "failed"
                    state.errorText = action.payload
                }
            })
            .addCase(updateGrade.pending, (state, action) => {
                state.pageStatus = "loading"
                state.cardIsLoading = true
            })
            .addCase(updateGrade.fulfilled, (state, action) => {
                let card = state.cards.find(card => card._id === action.payload.card_id)
                if (card) {
                    card.grade = action.payload.grade
                    card.shots = action.payload.shots
                }
                state.pageStatus = "succeeded"
                state.cardIsLoading = false
            })
            .addCase(updateGrade.rejected, (state, action) => {
                if (action.payload) {
                    state.pageStatus = "failed"
                    state.errorText = action.payload
                }
            })
    }
})

export const {setPracticePackId} = practiceSlice.actions
