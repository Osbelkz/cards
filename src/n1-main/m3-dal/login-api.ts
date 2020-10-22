import axios from "axios"

export const loginAPI = {
    logInUserInApp(data: RequestParamsType) {
        return  axios.post<ResponseType>(`https://neko-back.herokuapp.com/2.0/auth/login`, data, {withCredentials: true})
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
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
    avatar: string
}

// "https://neko-back.herokuapp.com/2.0" main url