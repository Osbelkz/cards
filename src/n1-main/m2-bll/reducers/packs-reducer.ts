import {CardPackType, packsApi} from "../../m3-dal/packs-api"
import {Dispatch} from "redux";
import {RootStateType} from "../store";
import { StatusType } from "./app-reducer";

enum ACTION_TYPES {
    CHANGE_PAGE = "packs/CHANGE_PAGE",
    CHANGE_PAGE_COUNT = "packs/CHANGE_PAGE_COUNT",
    SET_TOTAL_COUNT = "packs/SET_TOTAL_COUNT",
    SET_PACKS = "packs/SET_PACKS",
    SET_SEARCH_NAME = "packs/SET_SEARCH_NAME",
    SET_SEARCH_PARAMS = "packs/SET_SEARCH_PARAMS",
    SET_IS_LOADING = "packs/SET_IS_LOADING"
}


const initialState = {
    packs: null as Array<CardPackType> | null,
    cardPacksTotalCount: 0,
    page: 1,
    pageCount: 10,
    min: undefined as undefined | number,
    max: undefined as undefined | number,
    pageStatus: "idle" as StatusType,
    searchParams: {
        packName: "" as string | undefined,
        min: undefined as undefined | number,
        max: undefined as undefined | number,
    }
}

export const packsReducer = (state: PacksStateType = initialState, action: ActionsType): PacksStateType => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_PAGE:
        case ACTION_TYPES.CHANGE_PAGE_COUNT:
        case ACTION_TYPES.SET_TOTAL_COUNT:
        case ACTION_TYPES.SET_PACKS:
        case ACTION_TYPES.SET_IS_LOADING:
            return {
                ...state, ...action.payload
            }
        case ACTION_TYPES.SET_SEARCH_NAME:
            return {
                ...state, searchParams: {...state.searchParams, packName: action.payload.packName}
            }
        case ACTION_TYPES.SET_SEARCH_PARAMS:
            return {
                ...state, searchParams: {...action.payload}
            }
        default:
            return state
    }
}

export const changePageAC = (page: number) => {
    return {type: ACTION_TYPES.CHANGE_PAGE, payload: {page}} as const
}
export const changePageCountAC = (pageCount: number) => {
    return {type: ACTION_TYPES.CHANGE_PAGE_COUNT, payload: {pageCount}} as const
}
const setTotalCountAC = (cardPacksTotalCount: number) => {
    return {type: ACTION_TYPES.SET_TOTAL_COUNT, payload: {cardPacksTotalCount}} as const
}
const setPacksAC = (packs: Array<CardPackType>, cardPacksTotalCount: number, min: number, max: number, pageStatus: StatusType) => {
    return {type: ACTION_TYPES.SET_PACKS, payload: {packs, cardPacksTotalCount, pageStatus}} as const
}
export const setSearchNameAC = (packName: string) => {
    return {type: ACTION_TYPES.SET_SEARCH_NAME, payload: {packName}} as const
}
export const setSearchParamsAC = (packName?: string, min?: number, max?: number) => {
    return {type: ACTION_TYPES.SET_SEARCH_PARAMS, payload: {packName, min, max}} as const
}
export const setPageStatus = (pageStatus: StatusType) => {
    return {type: ACTION_TYPES.SET_IS_LOADING, payload: {pageStatus}} as const
}

export const getPacksTC = (selectedPage?: number) => async (dispatch: Dispatch, getState: () => RootStateType) => {
    const {page, pageCount, searchParams: {packName, min, max}} = getState().packs
    dispatch(setPageStatus("loading"))
    try {
        const response = await packsApi.getPacks({page: selectedPage || page, pageCount, packName, min, max})
        console.log(response.data)
        dispatch(setPacksAC(response.data.cardPacks,
            response.data.cardPacksTotalCount,
            response.data.minCardsCount,
            response.data.maxCardsCount,
            "succeeded"))
        selectedPage && dispatch(changePageAC(selectedPage))
    } catch (e) {
        console.log("get packs tc")
        alert(e.response.data.error)
        dispatch(setPageStatus("failed"))
    } finally {

    }
}

//dispatch hasn't types
export const deletePackTC = (id: string) => async (dispatch: any) => {
    dispatch(setPageStatus("loading"))
    try {
        const response = await packsApi.deletePack(id)
        dispatch(getPacksTC())
    } catch (e) {
        alert(e.response.data.error)
    }
}
//dispatch hasn't types
export const createPackTC = (name: string) => async (dispatch: any) => {
    dispatch(setPageStatus("loading"))
    try {
        const response = await packsApi.createPack({name})
        dispatch(getPacksTC(1))
    } catch (e) {
        console.log("create tc")
        alert(e.response.data.error)
    }
}
//under construction
//dispatch hasn't types
export const updatePackTC = (name: string, _id: string) => async (dispatch: any) => {
    dispatch(setPageStatus("loading"))
    try {
        const response = await packsApi.updatePack({name, _id})
        dispatch(getPacksTC(1))
    } catch (e) {
        alert(e.response.data.error)
    }
}

type PacksStateType = typeof initialState
export type SearchParamsType = typeof initialState.searchParams


type ActionsType = ReturnType<typeof changePageAC>
    | ReturnType<typeof changePageCountAC>
    | ReturnType<typeof setTotalCountAC>
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setSearchNameAC>
    | ReturnType<typeof setSearchParamsAC>
    | ReturnType<typeof setPageStatus>
