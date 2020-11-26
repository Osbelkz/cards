import {CardPackType, packsApi} from "../../m3-dal/packs-api";
import {RootStateType} from "../store";
import {StatusType} from "./app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";



export type PacksStateType = typeof initialState
export type SearchParamsType = typeof initialState.searchParams


const initialState = {
    packs: [] as Array<CardPackType>,
    getMyPacks: false,
    cardPacksTotalCount: 0,
    page: 1,
    pageCount: 10,
    min: 0,
    max: 0,
    pageStatus: "idle" as StatusType,
    searchParams: {
        packName: "",
        sortPacks: "",
        min: 0,
        max: 0,
        user_id: ""
    },
    errorText: ""
}

export const getPacks = createAsyncThunk<
    {packs: CardPackType[], cardPacksTotalCount: number, min: number,
        max: number, page?: number},
    number | undefined,
    {rejectValue: string, state: RootStateType}
    >("packs/getPacks",
    async (selectedPage, {getState, rejectWithValue}) => {
        const {page, pageCount,
            searchParams: {packName, min, max, sortPacks, user_id}} = getState().packs
        try {
            const response = await packsApi.getPacks({
                page: selectedPage || page,
                pageCount,
                packName,
                min,
                max,
                sortPacks,
                user_id
            })
            const {cardPacks, maxCardsCount, minCardsCount, cardPacksTotalCount} = response.data
            return {packs: cardPacks, min: minCardsCount, max: maxCardsCount, cardPacksTotalCount, page: selectedPage}
        } catch (e) {
            const error: { response: { data: { error: string } } } = e
            return rejectWithValue(error.response ? error.response.data.error : "unknown error")
        }
    })

export const deletePack = createAsyncThunk<
    undefined,
    string,
    {rejectValue: string, state: RootStateType}
    >("packs/deletePack",
    async (id, {rejectWithValue, dispatch}) => {
    try {
        await packsApi.deletePack(id)
        await dispatch(getPacks())
    } catch (e) {
        const error: { response: { data: { error: string } } } = e
        return rejectWithValue(error.response ? error.response.data.error : "unknown error")
    }
})

export const createPack = createAsyncThunk<
    undefined,
    string,
    {rejectValue: string, state: RootStateType}
    >("packs/createPack",
    async (name, {rejectWithValue, dispatch}) => {
    try {
        await packsApi.createPack({name})
        await dispatch(getPacks(1))
    } catch (e) {
        const error: { response: { data: { error: string } } } = e
        return rejectWithValue(error.response ? error.response.data.error : "unknown error")
    }
})

export const updatePack = createAsyncThunk<
    { name: string, _id: string },
    { name: string, _id: string },
    {rejectValue: string}
    >("packs/updatePack",
    async ({name, _id}, {rejectWithValue}) => {
    try {
        await packsApi.updatePack({name, _id})
        return { name, _id }
    } catch (e) {
        const error: { response: { data: { error: string } } } = e
        return rejectWithValue(error.response ? error.response.data.error : "unknown error")
    }
})

export const packsSlice = createSlice({
    name: "packs",
    initialState,
    reducers: {
        changePagePacks: (state, action: PayloadAction<{ page: number }>) => {
            state.page = action.payload.page
        },
        changePageCountPacks: (state, action: PayloadAction<{ pageCount: number }>) => {
            state.pageCount = action.payload.pageCount
        },
        setSearchParams: (state, action: PayloadAction<{ packName: string, min: number, max: number }>) => {
            const {packName, max, min} = action.payload
            state.searchParams.packName = packName
            state.searchParams.min = min
            state.searchParams.max = max
        },
        setPacksSortColumn: (state, action: PayloadAction<{ sortPacks: string }>) => {
            state.searchParams.sortPacks = action.payload.sortPacks
        },
        setUserIdAC: (state, action: PayloadAction<{ user_id: string }>) => {
            state.searchParams.user_id = action.payload.user_id
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getPacks.pending, (state) => {
                state.pageStatus = "loading"
            })
            .addCase(getPacks.fulfilled, (state, action) => {
                const {packs, cardPacksTotalCount, page, min, max} = action.payload
                state.packs = packs
                state.min = min
                state.max = max
                state.cardPacksTotalCount = cardPacksTotalCount
                if (page) {
                    state.page = page
                }
                state.pageStatus = "succeeded"
            })
            .addCase(getPacks.rejected, (state, action) => {
                if (action.payload) {
                    state.errorText = action.payload
                    state.pageStatus = "failed"
                }
            })
            .addCase(deletePack.pending, (state) => {
                state.pageStatus = "loading"
            })
            .addCase(deletePack.fulfilled, (state) => {
                state.pageStatus = "succeeded"
            })
            .addCase(deletePack.rejected, (state, action) => {
                if (action.payload) {
                    state.errorText = action.payload
                    state.pageStatus = "failed"
                }
            })
            .addCase(createPack.pending, (state) => {
                state.pageStatus = "loading"
            })
            .addCase(createPack.fulfilled, (state) => {
                state.pageStatus = "succeeded"
            })
            .addCase(createPack.rejected, (state, action) => {
                if (action.payload) {
                    state.errorText = action.payload
                    state.pageStatus = "failed"
                }
            })
            .addCase(updatePack.pending, (state) => {
                state.pageStatus = "loading"
            })
            .addCase(updatePack.fulfilled, (state, action) => {
                let pack = state.packs.find(pack => pack._id === action.payload._id)
                if (pack) {
                    pack.name = action.payload.name
                    state.page = 1
                    state.pageStatus = "succeeded"
                }
            })
            .addCase(updatePack.rejected, (state, action) => {
                if (action.payload) {
                    state.errorText = action.payload
                    state.pageStatus = "failed"
                }
            })
    }
})

export const {setSearchParams, setPacksSortColumn, changePageCountPacks, changePagePacks, setUserIdAC} = packsSlice.actions
