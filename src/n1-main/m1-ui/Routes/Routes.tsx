import React from 'react';
import {Route, Switch} from "react-router-dom";
import ProfileContainer from "../Profile/ProfileContainer";
import LoginContainer from "../../../n2-features/f1-auth/a1-login/LoginContainer";
import RegisterContainer from "../../../n2-features/f1-auth/a2-register/RegisterContainer";
import RestoreContainer from "../../../n2-features/f1-auth/a3-restore/RestoreContainer";
import NewPasswordContainer from "../../../n2-features/f1-auth/a4-new-password/NewPasswordContainer";

const Routes = () => {
    return (
        <Switch>
            <Route path={"/profile"} render={() => <ProfileContainer/>}/>
            <Route path={"/login"} render={() => <LoginContainer/>}/>
            <Route path={"/register"} render={() => <RegisterContainer/>}/>
            <Route path={"/restore"} render={() => <RestoreContainer/>}/>
            <Route path={"/newPassword/:token"} render={() => <NewPasswordContainer/>}/>
            <Route path={"*"} render={() => <ProfileContainer/>}/>
        </Switch>
    );
};

export default Routes;
