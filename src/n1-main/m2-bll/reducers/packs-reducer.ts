import {CardPackType, packsApi} from "../../m3-dal/packs-api"
import {Dispatch} from "redux";
import {RootStateType} from "../store";

enum ACTION_TYPES {
    CHANGE_PAGE = "packs/CHANGE_PAGE",
    CHANGE_PAGE_COUNT = "packs/CHANGE_PAGE_COUNT",
    SET_TOTAL_COUNT = "packs/SET_TOTAL_COUNT",
    SET_PACKS = "packs/SET_PACKS",
    SET_SEARCH_NAME = "packs/SET_SEARCH_NAME",
}


const initialState = {
    cardPacksTotalCount: 0,
    page: 1,
    pageCount: 10,
    searchName: "",
    packs: null as Array<CardPackType> | null
}

export const packsReducer = (state: PacksStateType = initialState, action: ActionsType): PacksStateType => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_PAGE:
            return {
                ...state, ...action.payload
            }
        case ACTION_TYPES.CHANGE_PAGE_COUNT:
            return {
                ...state, ...action.payload
            }
        case ACTION_TYPES.SET_TOTAL_COUNT:
            return {
                ...state, ...action.payload
            }
        case ACTION_TYPES.SET_PACKS:
            return {
                ...state, ...action.payload
            }
        case ACTION_TYPES.SET_SEARCH_NAME:
            return {
                ...state, ...action.payload
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
const setPacksAC = (packs: Array<CardPackType>, cardPacksTotalCount: number) => {
    return {type: ACTION_TYPES.SET_PACKS, payload: {packs, cardPacksTotalCount}} as const
}
export const setSearchNameAC = (searchName: string) => {
    return {type: ACTION_TYPES.SET_SEARCH_NAME, payload: {searchName}} as const
}



export const getPacksTC = (packName?: string, min?: number, max?: number) => async (dispatch: Dispatch, getState: () => RootStateType) => {
    const {page, pageCount} = getState().packs
    try {
        const response = await packsApi.getPacks({page, pageCount, packName, min, max})

        dispatch(setPacksAC(response.data.cardPacks, response.data.cardPacksTotalCount))
    } catch (e) {
        alert(e.response.data.error)
    }
}

//dispatch hasn't types
export const deletePackTC = (id: string) => async (dispatch: any) => {
    try {
        const response = await packsApi.deletePack(id)
        dispatch(getPacksTC())
    } catch (e) {
        alert(e.response.data.error)
    }
}
//dispatch hasn't types
export const createPackTC = (name: string) => async (dispatch: any) => {
    try {
        const response = await packsApi.createPack({name})
        dispatch(getPacksTC())
    } catch (e) {
        alert(e.response.data.error)
    }
}
//under construction
//dispatch hasn't types
export const updatePackTC = (name: string, _id: string) => async (dispatch: any) => {
    try {
        const response = await packsApi.updatePack({name, _id})
        dispatch(getPacksTC())
    } catch (e) {
        alert(e.response.data.error)
    }
}

type PacksStateType = typeof initialState

type ActionsType = ReturnType<typeof changePageAC>
    | ReturnType<typeof changePageCountAC>
    | ReturnType<typeof setTotalCountAC>
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setSearchNameAC>
