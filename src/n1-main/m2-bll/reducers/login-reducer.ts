import {loginAPI} from "../../m3-dal/login-api";

export type LoginStateType = typeof initialState

const initialState = {}

export const loginReducer = (state = initialState, action: ActionsType): LoginStateType => {
    switch (action.type) {
        default:
            return state;
    }
};

export const logInUserInAppTC = () => {
    loginAPI.logInUserInApp({
        email: "",
        password: "",
        rememberMe: false
    })
}

type ActionsType = any
