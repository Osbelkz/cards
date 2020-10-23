import axios from "axios"

export const restoreAPI = {
    getLinkForResetPassword(data: RequestParamsType) {
        return  axios.post<ResponseType>(`http://localhost:7542/2.0/auth/forgot`, data, {withCredentials: true})
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
