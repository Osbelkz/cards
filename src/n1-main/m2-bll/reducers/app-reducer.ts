import {Dispatch} from "redux";
import { authAPI } from "../../m3-dal/auth-api";
import {RootStateType} from "../store";
import {setErrorText, setValueIsLoggedSuccess } from "./login-reducer";
import {setProfileUserDataAC} from "./profileP-reducer";

enum ACTION_TYPE {
    SET_APP_ERROR = "App/SET_APP_ERROR",
    SET_INIT_APP = "App/SET_INIT_APP"
}

const initialState = {
    error: "",
    initApp: "idle" as StatusType
}

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case ACTION_TYPE.SET_APP_ERROR:
            return {
                ...state, ...action.payload
            }
        case ACTION_TYPE.SET_INIT_APP:
            return {
                ...state, ...action.payload
            }
        default:
            return state;
    }
};

// actions
export const setAppErrorAC = (error: string) => {
    return {type: ACTION_TYPE.SET_APP_ERROR, payload: {error}}
}
export const setInitAppAC = (initApp: StatusType) => {
    return {type: ACTION_TYPE.SET_INIT_APP, payload: {initApp}}
}

export type ActionsType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setInitAppAC>

// thunk

export const authMeTC = () => async (dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(setInitAppAC("loading"))
    dispatch(setAppErrorAC(""))
    try {
        let response = await authAPI.me()
        dispatch(setProfileUserDataAC(response.data))
        dispatch(setValueIsLoggedSuccess(true))
        dispatch(setInitAppAC("succeeded"))
    } catch (e) {
        dispatch(setAppErrorAC(e.response ? e.response.data.error : "unknown error"))
        dispatch(setInitAppAC("failed"))
        dispatch(setErrorText(e.response ? e.response.data.error : "unknown error"))
    }
}

export type AppStateType = typeof initialState
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

