import axios from "axios"

export const newPasswordAPI = {
    setNewPassword(data: RequestParamsType) {
        return axios.post<ResponseType>(`https://neko-back.herokuapp.com/2.0/auth/set-new-password`, data, {withCredentials: true})
    }
}
export type RequestParamsType = {
    password: string
    resetPasswordToken: string
}

type ResponseType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}
