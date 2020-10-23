import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {loginReducer} from "./reducers/login-reducer";
import {newPasswordReducer} from "./reducers/newPassword-reducer";
import {profileReducer} from "./reducers/profileP-reducer";
import {registerReducer} from "./reducers/register-reducer";
import {restorePasswordReducer} from "./reducers/restorePassword-reducer";
import {appReducer} from "./reducers/app-reducer";


export const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    restorePassword: restorePasswordReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    app: appReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>
