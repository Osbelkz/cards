import {authAPI} from "../../m3-dal/auth-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export type RestorePasswordStateType = typeof initialState

const initialState = {
    isSentSuccess: false,
    textAfterRequest: "",
    isLoading: false
}

export const restoreTC = createAsyncThunk<string, string, { rejectValue: string }>("restore/restoreTC",
    async (value: string, {rejectWithValue, dispatch}) => {
        try {
            const response = await authAPI.getLinkForResetPassword(value)
            return response.data.info
        } catch (e) {
            const error: { response: { data: { error: string } } } = e
            return rejectWithValue(error.response.data.error)
        }
    })

export const restorePasswordSlice = createSlice({
    name: "restore",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(restoreTC.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(restoreTC.fulfilled, (state, action) => {
                state.textAfterRequest = action.payload
                state.isSentSuccess = true
                state.isLoading = false
            })
            .addCase(restoreTC.rejected, (state, action) => {
                if (action.payload) {
                    state.textAfterRequest = action.payload
                    state.isLoading = false
                }
            })
    }
})
