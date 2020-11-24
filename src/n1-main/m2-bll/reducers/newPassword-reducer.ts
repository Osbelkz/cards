import {authAPI} from "../../m3-dal/auth-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootStateType} from "../store";
import {setErrorText} from "./login-reducer";

export type NewPasswordStateType = typeof initialState

const initialState = {
    isSetNewPassword: false,
    error: "" ,
    isOk: "",
    isLoading: false
}

export const setNewPasswordTC = createAsyncThunk<
    { isOk: string },
    { newPassword: string, token: string },
    {rejectValue: string, state: RootStateType}
    >("newPassword/setNewPassword",
    async ({newPassword, token}, {rejectWithValue, dispatch}) => {
        try {
            const response = await authAPI.setNewPassword({
                password: newPassword,
                resetPasswordToken: token
            })
            return {isOk: response.data.info}
        } catch (e) {
            setTimeout(dispatch, 5000, setErrorText(""))
            const error: { response: { data: { error: string } } } = e
            return rejectWithValue(error.response ? error.response.data.error : "unknown error")
        }
    })

export const newPasswordSlice = createSlice({
    name: "newPassword",
    initialState,
    reducers: {
        setErrorText: (state, action: PayloadAction<{error: string}>) => {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder
            .addCase(setNewPasswordTC.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(setNewPasswordTC.fulfilled, (state, action) => {
                state.isSetNewPassword = true
                state.isLoading = false
                state.isOk = action.payload.isOk
            })
            .addCase(setNewPasswordTC.rejected, (state, action) => {
                if (action.payload) {
                    state.isLoading = false
                    state.error = action.payload
                }
            })
    }
})
