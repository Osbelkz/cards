import {authAPI, RequestRegisterType} from "../../m3-dal/auth-api";
import {StatusType} from "./app-reducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { ErrorType } from "../commonTypes";

export type RegisterStateType = typeof initialState

const initialState = {
    error: "",
    status: "idle" as StatusType,
}

export const addUserTC = createAsyncThunk<undefined, RequestRegisterType, { rejectValue: string }>("register/addUser",
    async (data, {rejectWithValue}) => {
        try {
            await authAPI.register(data)
        } catch (e) {
            const error: ErrorType = e
            return rejectWithValue(error.response ? error.response.data.error : "unknown error")
        }
    })

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addUserTC.pending, (state, action) => {
                state.status = "loading"
                state.error = ""
            })
            .addCase(addUserTC.fulfilled, (state, action) => {
                state.status = "succeeded"
            })
            .addCase(addUserTC.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                    state.status = "failed"
                }
            })
    }
})
