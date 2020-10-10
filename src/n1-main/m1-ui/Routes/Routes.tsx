import React from 'react';
import classes from "./Routes.module.css";
import NavItem from "../common/NavItem/NavItem";

const Routes = () => {
    return (
        <nav className={classes.routes}>
            <NavItem path={"/profile"} title={"Profile"}/>
            <NavItem path={"/login"} title={"Login"}/>
            <NavItem path={"/register"} title={"Registration"}/>
            <NavItem path={"/restore"} title={"Restore password"}/>
            <NavItem path={"/newPassword"} title={"New password"}/>
        </nav>
    );
};

export default Routes;
