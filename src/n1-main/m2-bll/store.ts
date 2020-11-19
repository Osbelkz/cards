import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {loginReducer} from "./reducers/login-reducer";
import {newPasswordReducer} from "./reducers/newPassword-reducer";
import {profileReducer} from "./reducers/profileP-reducer";
import {registerReducer} from "./reducers/register-reducer";
import {restorePasswordSlice} from "./reducers/restorePassword-reducer";
import {appReducer} from "./reducers/app-reducer";
import {packsReducer} from "./reducers/packs-reducer";
import {cardsReducer} from "./reducers/cards-reducer";
import {configureStore} from "@reduxjs/toolkit";
import { practiceReducer } from "./reducers/practice-reducer";


export const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    restorePassword: restorePasswordSlice.reducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer,
    app: appReducer,
    practice: practiceReducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootStateType = ReturnType<typeof rootReducer>
