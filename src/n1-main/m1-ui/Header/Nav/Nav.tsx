import React from 'react';
import NavItem from "../../common/NavItem/NavItem";
import classes from "./Nav.module.css";
import {Button} from "../../common/Button/Button";

export const NavLogOut = () => {
    return <nav className={classes.logOut}>
        <NavItem path={"/login"} title={"Login"}/>
        <NavItem path={"/register"} title={"Registration"}/>
    </nav>
}

type NavLogInPropsType = {
    logout: () => void
}

export const NavLogIn = ({logout}: NavLogInPropsType) => {
    return <nav className={classes.logIn}>
        <div className={classes.links}>
            <NavItem path={"/profile"} title={"Profile"}/>
            <NavItem path={"/packs"} title={"Packs"} />
        </div>
        <Button onClick={logout} btnName={"Logout"} btnType={"red"} style={{margin: "10px"}}/>
    </nav>
}
