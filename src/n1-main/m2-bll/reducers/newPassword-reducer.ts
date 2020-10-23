import {Dispatch} from "redux";
import {authAPI} from "../../m3-dal/auth-api";

export type NewPasswordStateType = typeof initialState

const initialState = {
    isSetNewPassword: false as boolean,
    error: "" as string,
    isOk: "" as string,
    isLoading: false as boolean
}

export const newPasswordReducer = (state = initialState, action: ActionsType): NewPasswordStateType => {
    switch (action.type) {
        case "newPassword/SET-VALUE-IS-SET-NEW-PASSWORD":
            return {...state, isSetNewPassword: action.value}
        case "newPassword/SET-ERROR-TEXT":
            return {...state, error: action.error}
        case "newPassword/SET-VALUE-IS-OK":
            return {...state, isOk: action.text}
        case "restore/SET-VALUE-IS-LOADING":
            return {...state, isLoading: action.isLoading}
        default:
            return state;
    }
};

export const setNewPasswordTC = (newPassword: string, token: string) => (dispatch: Dispatch) => {
    dispatch(setValueIsLoading(true))
    authAPI.setNewPassword({
        password: newPassword,
        resetPasswordToken: token
    })
        .then(res => {
            if (res.status === 200) {
                dispatch(setValueIsSetNewPassword(true))
                dispatch(setValueIsOk(res.data.info))
                dispatch(setValueIsLoading(false))
            }
        })
        .catch(error => {
            dispatch(setErrorText(error.response.data.error))
            dispatch(setValueIsLoading(false))
            setTimeout(dispatch, 5000, setErrorText(""))
        })
}

export const setValueIsSetNewPassword = (value: boolean) =>
    ({type: "newPassword/SET-VALUE-IS-SET-NEW-PASSWORD", value} as const)

export const setErrorText = (error: string) =>
    ({type: "newPassword/SET-ERROR-TEXT", error} as const)

export const setValueIsOk = (text: string) =>
    ({type: "newPassword/SET-VALUE-IS-OK", text} as const)

export const setValueIsLoading = (isLoading: boolean) =>
    ({type: "restore/SET-VALUE-IS-LOADING", isLoading} as const)

type ActionsType = ReturnType<typeof setValueIsSetNewPassword>
                | ReturnType<typeof setErrorText>
                | ReturnType<typeof setValueIsOk>
                | ReturnType<typeof setValueIsLoading>
