import {Dispatch} from "redux";
import {authAPI, UserDataType} from "../../m3-dal/auth-api";
import {setAppError, setInitApp } from "./app-reducer";
import {setErrorText, setValueIsLoggedSuccess} from "./login-reducer";


enum ACTION_TYPE {
    SET_USER = "Profile/SET_USER",
}


const initialState = {
    userData: null as UserDataType | null
}

export const profileReducer = (state: ProfileStateType = initialState, action: ActionsType): ProfileStateType => {
    switch (action.type) {

        case ACTION_TYPE.SET_USER:
            return {
                ...state, ...action.payload
            }

        default:
            return state;
    }
};

// actions

export const setProfileUserDataAC = (userData: UserDataType | null) => {
    return {type: ACTION_TYPE.SET_USER, payload: {userData}}
}

export const logoutUserInAppTC = () =>async (dispatch: Dispatch) => {
    dispatch(setInitApp({initApp: "loading"}))
    dispatch(setAppError({error: ""}))
    try {
        let response = authAPI.logoutUserInApp()
        dispatch(setProfileUserDataAC(null))
        dispatch(setValueIsLoggedSuccess(false))
        dispatch(setInitApp({initApp: "succeeded"}))
    } catch (e) {
        dispatch(setInitApp({initApp: "failed"}))
        dispatch(setErrorText(e.response ? e.response.data.error : "unknown error"))
    }
}

export type ActionsType = ReturnType<typeof setProfileUserDataAC>

export type ProfileStateType = typeof initialState

