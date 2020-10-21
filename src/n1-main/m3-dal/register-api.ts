import axios from "axios"

const BASE_URL = "https://neko-back.herokuapp.com/2.0"

const instanse = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export const registerAPI = {
    register (data: RegisterDataType) {
        return instanse.post<ResponseType | ErrorType>("/auth/register", data)
    }
}

export type RegisterDataType = {
    email: string
    password: string}

type ResponseType = {
    "addedUser": {
        "_id": string,
        "email": string
        "rememberMe": boolean
        "isAdmin": boolean
        "name": string
        "verified": boolean
        "publicCardPacksCount": number
        "created": string
        "updated": string
        "__v": number
    }
}

type ErrorType = {
    "error": string
    "email": string
    "in": string
}
