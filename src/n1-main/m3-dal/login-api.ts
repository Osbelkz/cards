import axios from "axios"

export const loginAPI = {
    logInUserInApp(data: RequestParamsType) {
        const promise = axios.post<ResponseType>(`https://neko-back.herokuapp.com/2.0/auth/login`, data, {withCredentials: true})
        return promise
    }
}
export type RequestParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

type ResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    update: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error: string
}