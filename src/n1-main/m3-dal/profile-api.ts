import axios from "axios"

const BASE_URL = "https://neko-back.herokuapp.com/2.0"

const instanse = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export const authAPI = {
    me() {
        return instanse.post<ResponseType | ErrorType>("/auth/me", {})
    }
}

export type UserDataType = {
    _id: string,
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
    avatar: null | string
}

type ResponseType = {
    addedUser: UserDataType
}

type ErrorType = {
    error: string
    email: string
    in: string
}
