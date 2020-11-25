import {authAPI, UserDataType} from "../../m3-dal/auth-api";
import {setAppError, setInitApp} from "./app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootStateType} from "../store";

const initialState = {
    userData: null as UserDataType | null,
    isLoading: false,
    isLoggedSuccess: false,
    error: ""
}

export const logInUserInApp = createAsyncThunk<
    { userData: UserDataType },
    { email: string, password: string, rememberMe: boolean },
    {rejectValue: string, state: RootStateType}
    >("login/logInUserInApp",
    async ({email, password, rememberMe}, {rejectWithValue, dispatch}) => {
        try {
            const response = await authAPI.logInUserInApp({email, password, rememberMe})
            dispatch(setInitApp({initApp: "succeeded"}))
            return {userData: response.data}
        } catch (e) {
            setTimeout(dispatch, 5000, setErrorText({error: ""}))
            const error: { response: { data: { error: string } } } = e
            return rejectWithValue(error.response ? error.response.data.error : (e.message + ', more details in the console'))
        } 
    })

export const logoutUserInApp = createAsyncThunk<
    undefined,
    undefined,
    {rejectValue: string, state: RootStateType}
    >("login/logoutUserInAppTC",
    async (arg, {rejectWithValue, dispatch}) => {
        dispatch(setInitApp({initApp: "loading"}))
        dispatch(setAppError({error: ""}))
        try {
            await authAPI.logoutUserInApp()
            dispatch(setInitApp({initApp: "succeeded"}))
        } catch (e) {
            dispatch(setInitApp({initApp: "failed"}))
            const error: { response: { data: { error: string } } } = e
            return rejectWithValue(error.response ? error.response.data.error : "unknown error")
        }
    })

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setProfileUserData: (state, action: PayloadAction<{userData: UserDataType}>) => {
            state.userData = action.payload.userData
        },
        setValueIsLoggedSuccess: (state, action: PayloadAction<{ isLoggedSuccess: boolean }>) => {
            state.isLoggedSuccess = action.payload.isLoggedSuccess
        },
        setErrorText: (state, action: PayloadAction<{error: string}>) => {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder
            .addCase(logInUserInApp.pending, (state, action) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(logInUserInApp.fulfilled, (state, action) => {
                state.userData = action.payload.userData
                state.isLoggedSuccess = true
                state.isLoading = false
            })
            .addCase(logInUserInApp.rejected, (state, action) => {
                if (action.payload) {
                    state.isLoading = false
                    state.error = action.payload
                }
            })
            .addCase(logoutUserInApp.fulfilled, (state, action) => {
                state.userData = null
                state.isLoggedSuccess = false
            })
            .addCase(logoutUserInApp.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
            })
    }
})
export const {setValueIsLoggedSuccess, setProfileUserData, setErrorText} = loginSlice.actions