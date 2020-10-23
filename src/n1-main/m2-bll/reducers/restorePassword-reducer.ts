import {Dispatch} from "redux";
import {authAPI} from "../../m3-dal/auth-api";

export type RestorePasswordStateType = typeof initialState

const initialState = {
    isSentSuccess: false as boolean,
    textAfterRequest: "" as string,
    isLoading: false as boolean
}

export const restorePasswordReducer = (state = initialState, action: ActionsType): RestorePasswordStateType => {
    switch (action.type) {
        case "restore/SET-VALUE-IS-SENT-SUCCESS":
            return {...state, isSentSuccess: action.value}
        case "restore/SET-TEXT-AFTER-REQUEST":
            return {...state, textAfterRequest: action.textAfterRequest}
        case "restore/SET-VALUE-IS-LOADING":
            return {...state, isLoading: action.isLoading}
        default:
            return state;
    }
};

export const restoreTC = (value: string) => (dispatch: Dispatch) => {
    dispatch(setValueIsLoading(true))
    authAPI.getLinkForResetPassword({
        email: value,
        from: "admin",
        message: `<div style="background-color: lime; padding: 15px">
                    password recovery link: 
                    <a href="https://osbelkz.github.io/cards#/newPassword/$token$"> 
                    link</a>
                </div>` // после полной заливки на ghp, заменить ссылку на страницу new password on ghp
    })
        .then(res => {
            if (res.data.success ) {
                dispatch(setValueIsSentSuccess(true))
                dispatch(setRestoreTextAfterRequest(res.data.info))
                dispatch(setValueIsLoading(false))
            }
        })
        .catch(error => {
            dispatch(setRestoreTextAfterRequest(error.response.data.error))
            dispatch(setValueIsLoading(false))
            setTimeout(dispatch, 5000, setRestoreTextAfterRequest(""))
        })
}

export const setValueIsSentSuccess = (value: boolean) =>
    ({type: "restore/SET-VALUE-IS-SENT-SUCCESS", value} as const)

export const setRestoreTextAfterRequest = (textAfterRequest: string) =>
    ({type: "restore/SET-TEXT-AFTER-REQUEST", textAfterRequest} as const)

export const setValueIsLoading = (isLoading: boolean) =>
    ({type: "restore/SET-VALUE-IS-LOADING", isLoading} as const)

type ActionsType = ReturnType<typeof setValueIsSentSuccess>
    | ReturnType<typeof setRestoreTextAfterRequest>
    | ReturnType<typeof setValueIsLoading>

