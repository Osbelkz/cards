import {Dispatch} from "redux";
import {setProfileUserDataAC} from "./profileP-reducer";
import {authAPI} from "../../m3-dal/auth-api";
import {setInitAppAC} from "./app-reducer";

export type LoginStateType = typeof initialState

const initialState = {
    isLoading: false as boolean,
    isLoggedSuccess: false as boolean,
    error: "" as string
}

export const loginReducer = (state = initialState, action: ActionsType): LoginStateType => {
    switch (action.type) {
        case "login/SET-VALUE-IS-LOGGED-SUCCESS":
            return {...state, isLoggedSuccess: action.isLoggedSuccess}
        case "login/SET-VALUE-IS-LOADING":
            return {...state, isLoading: action.isLoading}
        case "login/SET-ERROR-TEXT":
            return {...state, error: action.error}
        default:
            return state;
    }
};

export const logInUserInAppTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setValueIsLoading(true))
    authAPI.logInUserInApp({
        email: email,
        password: password,
        rememberMe: rememberMe
    })
        .then(res => {
            dispatch(setProfileUserDataAC({...res.data}))
            dispatch(setInitAppAC("succeeded"))
            dispatch(setValueIsLoggedSuccess(true))
            dispatch(setValueIsLoading(false))

        })
        .catch(e => {
            dispatch(setValueIsLoading(false))
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setErrorText(error))
            setTimeout(dispatch, 5000, setErrorText(""))
        })
}

export const setValueIsLoading = (isLoading: boolean) =>
    ({type: "login/SET-VALUE-IS-LOADING", isLoading} as const)

export const setValueIsLoggedSuccess = (isLoggedSuccess: boolean) =>
    ({type: "login/SET-VALUE-IS-LOGGED-SUCCESS", isLoggedSuccess} as const)

export const setErrorText = (error: string) =>
    ({type: "login/SET-ERROR-TEXT", error} as const)

type ActionsType = ReturnType<typeof setValueIsLoading>
    | ReturnType<typeof setValueIsLoggedSuccess>
    | ReturnType<typeof setErrorText>
    | ReturnType<typeof setProfileUserDataAC>

