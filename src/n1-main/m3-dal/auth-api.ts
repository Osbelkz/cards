import axios from "axios"

const BASE_URL = "http://localhost:7542/2.0/" //"https://neko-back.herokuapp.com/2.0"

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export const authAPI = {
    me() {
        return instance.post<UserDataType>("/auth/me")
    },
    logInUserInApp(data: RequestLogInType) {
        return  instance.post<UserDataType>(`/auth/login`, data)
    },
    logoutUserInApp() {
        return  instance.delete<UserDataType>(`/auth/me`)
    },
    setNewPassword(data: RequestNewPasswordType) {
        return instance.post<NewPasswordResponseType>(`/auth/set-new-password`, data)
    },
    register (data: RequestRegisterType) {
        return instance.post<RegisterResponseType>("/auth/register", data)
    },
    getLinkForResetPassword(value: string) {
        return  instance.post<NewPasswordResponseType>(`/auth/forgot`, {
            email: value,
            from: "admin",
            message: `<div style="background-color: lime; padding: 15px">
                    password recovery link: 
                    <a href="https://osbelkz.github.io/cards#/newPassword/$token$"> 
                    link</a>
                </div>`
        })
    }
}

export type RequestRegisterType = {
    email: string
    password: string
}

export type RequestLogInType = {
    email: string
    password: string
    rememberMe: boolean
}

export type RequestNewPasswordType = {
    password: string
    resetPasswordToken: string
}

export type RequestResetPasswordType = {
    email: string
    from: string
    message: string
}

type RegisterResponseType = {
    "addedUser": UserDataType
}

type NewPasswordResponseType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
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

type ErrorType = {
    error: string
    email: string
    in: string
}
