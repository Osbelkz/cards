import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from "../Header/Header";
import classes from "./Main.module.css";
import ProfileContainer from "../Profile/ProfileContainer";
import LoginContainer from "../../../n2-features/f1-auth/a1-login/LoginContainer";
import RegisterContainer from "../../../n2-features/f1-auth/a2-register/RegisterContainer";
import RestoreContainer from "../../../n2-features/f1-auth/a3-restore/RestoreContainer";
import NewPasswordContainer from "../../../n2-features/f1-auth/a4-new-password/NewPasswordContainer";
import {Button} from "../common/Button/Button";
import {Input} from "../common/Input/Input";

const Main = () => {
    return (
        <div className={classes.main}>
            <Header/>
            <br/>
            <Switch>
                <Route path={"/profile"} render={() => <ProfileContainer/>}/>
                <Route path={"/login"} render={() => <LoginContainer/>}/>
                <Route path={"/register"} render={() => <RegisterContainer/>}/>
                <Route path={"/restore"} render={() => <RestoreContainer/>}/>
                <Route path={"/newPassword"} render={() => <NewPasswordContainer/>}/>
                <Route path={"*"} render={() => <ProfileContainer/>}/>
            </Switch>
            <div>
                <br/>
                <div>
                    <div>
                        <h3>Regular</h3>
                        <Button onClick={() => alert("clicked")} btnName={"Button"}/>
                        <Button onClick={() => alert("clicked")} btnName={"Button"} disabled={true}/>
                    </div>
                    <div>
                        <h3>Green</h3>
                        <Button onClick={() => alert("clicked")} btnName={"Button"} btnType={"green"}/>
                        <Button onClick={() => alert("clicked")} btnName={"Button"} btnType={"green"} disabled={true}/>
                    </div>
                    <div>
                        <h3>Red</h3>
                        <Button onClick={() => alert("clicked")} btnName={"Button"} btnType={"red"}/>
                        <Button onClick={() => alert("clicked")} btnName={"Button"} btnType={"red"} disabled={true}/>
                    </div>
                </div>
                <br/>
                <div>
                    <h3>Input</h3>
                    <Input onChange={() => alert("was changed")} value={"sadf"} placeHolder={"input"}/>
                    <Input onChange={() => alert("was changed")} value={""} placeHolder={"input"} disabled={true}/>
                </div>
            </div>
        </div>
    );
};

export default Main;
