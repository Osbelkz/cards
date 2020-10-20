import {Dispatch} from "redux";
import {RequestParamsType, restoreAPI} from "../../m3-dal/restore-api";

export type RestorePasswordStateType = typeof initialState

const initialState = {
    isSentSuccess: false as boolean,
    textAfterRequest: "" as string
}

export const restorePasswordReducer = (state = initialState, action: ActionsType): RestorePasswordStateType => {
    switch (action.type) {
        case "restore/SET-IS-SENT-SUCCESS":
            return {...state, isSentSuccess: action.value}
        case "restore/SET-TEXT-AFTER-REQUEST":
            return {...state, textAfterRequest: action.textAfterRequest}
        default:
            return state;
    }
};

export const restoreTC = (data: RequestParamsType) => (dispatch: Dispatch) => {

    restoreAPI.getLinkForResetPassword(data)
        .then(res => {
            if (res.data.success ) {
                dispatch(setIsSentSuccess(true))
                dispatch(setRestoreTextAfterRequest(res.data.info))
            }
        })
        .catch(error => {
            dispatch(setRestoreTextAfterRequest(error.response.data.error))
        })
}

export const setIsSentSuccess = (value: boolean) =>
    ({type: 'restore/SET-IS-SENT-SUCCESS', value} as const)

export const setRestoreTextAfterRequest = (textAfterRequest: string) =>
    ({type: 'restore/SET-TEXT-AFTER-REQUEST', textAfterRequest} as const)

type ActionsType = ReturnType<typeof setIsSentSuccess>
    |ReturnType<typeof setRestoreTextAfterRequest>

