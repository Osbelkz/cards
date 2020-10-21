import axios from "axios"

export const restoreAPI = {
    getLinkForResetPassword(data: RequestParamsType) {
        const promise = axios.post<ResponseType>(`https://neko-back.herokuapp.com/2.0/auth/forgot`, data, {withCredentials: true})
        return promise
    }
}
export type RequestParamsType = {
    email: string
    from: string
    message: string
}

type ResponseType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}