import {Dispatch} from "redux";
import {authAPI, UserDataType} from "../../m3-dal/profile-api";
import {RootStateType} from "../store";

enum ACTION_TYPE {
    SET_USER = "Profile/SET_USER",
    SET_ERROR = "Profile/SET_ERROR",
    SET_STATUS = "Profile/SET_STATUS"
}

const testProfile: UserDataType = {
    _id: "5f8db5f8af26d91404fa17ef",
    email: "osbelkz@gmail.com",
    rememberMe: false,
    isAdmin: false,
    name: "osbelkz@gmail.com",
    verified: true,
    publicCardPacksCount: 1,
    created: "2020-10-19T15:51:20.459Z",
    updated: "2020-10-22T05:34:13.698Z",
    __v: 0,
    token: "38135310-1428-11eb-9186-671c9950ef50",
    tokenDeathTime: 1603355653697,
    avatar: null
}

const initialState = {
    error: "",
    status: "idle" as StatusType,
    userData: null as UserDataType | null
}

export const profileReducer = (state: ProfileStateType = initialState, action: ActionsType): ProfileStateType => {
    switch (action.type) {
        case ACTION_TYPE.SET_ERROR:
            return {
                ...state, ...action.payload
            }
        case ACTION_TYPE.SET_STATUS:
            return {
                ...state, ...action.payload
            }
        case ACTION_TYPE.SET_USER:
            return {
                ...state, ...action.payload
            }

        default:
            return state;
    }
};

// actions
export const setProfileErrorAC = (error: string) => {
    return {type: ACTION_TYPE.SET_ERROR, payload: {error}}
}
export const setProfileStatusAC = (status: StatusType) => {
    return {type: ACTION_TYPE.SET_STATUS, payload: {status}}
}
export const setProfileUserDataAC = (userData: UserDataType | null) => {
    return {type: ACTION_TYPE.SET_USER, payload: {userData}}
}


export type ActionsType =
    ReturnType<typeof setProfileErrorAC>
    | ReturnType<typeof setProfileStatusAC>
    | ReturnType<typeof setProfileUserDataAC>
// thunk

export const authMeTC = () => async (dispatch: Dispatch, getState: () => RootStateType) => {
    debugger
    dispatch(setProfileStatusAC("loading"))
    dispatch(setProfileErrorAC(""))
    if (getState().profile.status === "loading") console.log("loading")
    try {
        await authAPI.me()
        dispatch(setProfileStatusAC("succeeded"))
    } catch (e) {
        dispatch(setProfileErrorAC(e.response ? e.response.data.error : "unknown error"))
        dispatch(setProfileStatusAC("failed"))
    }
}

export type ProfileStateType = typeof initialState
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

