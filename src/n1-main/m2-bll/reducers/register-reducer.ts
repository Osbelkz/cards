import {Dispatch} from "redux";
import {registerAPI, RegisterDataType} from "../../m3-dal/register-api";

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

export const addUserTC = (data: RegisterDataType) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC("loading"))
    try {
        let response = await registerAPI.register(data)
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        dispatch(setErrorAC(e.response.data.error))
        dispatch(setStatusAC("failed"))
    }
}

export type RegisterStateType = typeof initialState
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

