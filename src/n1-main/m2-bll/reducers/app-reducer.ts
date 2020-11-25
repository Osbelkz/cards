import {authAPI} from "../../m3-dal/auth-api";
import {setProfileUserData, setValueIsLoggedSuccess } from "./login-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootStateType} from "../store";

export const authMe = createAsyncThunk<
    undefined,
    undefined,
    {rejectValue: string, state: RootStateType}
    >("app/authMe",
    async (param, {dispatch,rejectWithValue}) => {
        try {
            const res = await authAPI.me()
            dispatch(setProfileUserData({userData: res.data}))
            dispatch(setValueIsLoggedSuccess({isLoggedSuccess: true}))
        } catch (e) {
            const error: {response: {data: {error: string}}} = e
            return rejectWithValue(error.response ? error.response.data.error : "unknown error")
        }
    })

export const appSlice = createSlice({
    name: "app",
    initialState: {
        error: "",
        initApp: "idle" as StatusType
    },
    reducers: {
        setInitApp: (state, action: PayloadAction<{ initApp: StatusType }>) => {
            state.initApp = action.payload.initApp
        },
        setAppError: (state, action: PayloadAction<{error: string}>) => {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder
            .addCase(authMe.pending, (state, action) => {
                state.initApp = "loading"
                state.error = ""
            })
            .addCase(authMe.fulfilled, (state, action) => {
                state.initApp = "succeeded"
            })
            .addCase(authMe.rejected, (state, action) => {
                if (action.payload) {
                    state.initApp = "failed"
                    state.error = action.payload
                }
            })
    }
})

export const {setInitApp, setAppError} = appSlice.actions

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
