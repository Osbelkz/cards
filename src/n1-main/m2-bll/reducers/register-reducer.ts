import {Dispatch} from "redux";
import {authAPI, RequestRegisterType} from "../../m3-dal/auth-api";

enum ACTION_TYPE {
    SET_ERROR = "SET_ERROR",
    SET_STATUS = "SET_STATUS"
}

const initialState = {
    error: "",
    status: "idle" as StatusType,
}

export const registerReducer = (state: RegisterStateType = initialState, action: ActionsType): RegisterStateType => {
    switch (action.type) {
        case ACTION_TYPE.SET_ERROR:
            return {
                ...state, ...action.payload
            }
        case ACTION_TYPE.SET_STATUS:
            return {
                ...state, ...action.payload
            }
        default:
            return state;
    }
};

// actions
export const setErrorAC = (error: string) => {
    return {type: ACTION_TYPE.SET_ERROR, payload: {error}}
}
export const setStatusAC = (status: StatusType) => {
    return {type: ACTION_TYPE.SET_STATUS, payload: {status}}
}

export type ActionsType =
    ReturnType<typeof setErrorAC>
    | ReturnType<typeof setStatusAC>

// thunk

export const addUserTC = (data: RequestRegisterType) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC("loading"))
    dispatch(setErrorAC(""))
    try {
        let response = await authAPI.register(data)
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        dispatch(setErrorAC(e.response ? e.response.data.error : "unknown error"))
        dispatch(setStatusAC("failed"))
        setTimeout(dispatch, 5000, setErrorAC(""))
    }
}

export type RegisterStateType = typeof initialState
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

