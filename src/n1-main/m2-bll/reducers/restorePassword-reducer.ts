import {Dispatch} from "redux";
import {restoreAPI} from "../../m3-dal/restore-api";

export type RestorePasswordStateType = typeof initialState

const initialState = {
    isSentSuccess: false as boolean,
    textAfterRequest: "" as string
}

export const restorePasswordReducer = (state = initialState, action: ActionsType): RestorePasswordStateType => {
    switch (action.type) {
        case "restore/SET-VALUE-IS-SENT-SUCCESS":
            return {...state, isSentSuccess: action.value}
        case "restore/SET-TEXT-AFTER-REQUEST":
            return {...state, textAfterRequest: action.textAfterRequest}
        default:
            return state;
    }
};

export const restoreTC = (value: string) => (dispatch: Dispatch) => {
    restoreAPI.getLinkForResetPassword({
        email: value,
        from: "admin",
        message: `<div style="background-color: lime; padding: 15px">
                    password recovery link: 
                    <a href="http://localhost:3000/cards#/newPassword/$token$"> 
                    link</a>
                </div>` // после полной заливки на ghp, заменить ссылку на страницу new password on ghp
    })
        .then(res => {
            if (res.data.success ) {
                dispatch(setValueIsSentSuccess(true))
                dispatch(setRestoreTextAfterRequest(res.data.info))
            }
        })
        .catch(error => {
            dispatch(setRestoreTextAfterRequest(error.response.data.error))
        })
}

export const setValueIsSentSuccess = (value: boolean) =>
    ({type: "restore/SET-VALUE-IS-SENT-SUCCESS", value} as const)

export const setRestoreTextAfterRequest = (textAfterRequest: string) =>
    ({type: "restore/SET-TEXT-AFTER-REQUEST", textAfterRequest} as const)

type ActionsType = ReturnType<typeof setValueIsSentSuccess>
    |ReturnType<typeof setRestoreTextAfterRequest>

