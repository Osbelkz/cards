import React from 'react';
import NavItem from "../../common/NavItem/NavItem";
import classes from "./Nav.module.css";

const Nav = () => {
    return (
        <nav className={classes.routes}>
            <NavItem path={"/profile"} title={"Profile"}/>
            <NavItem path={"/login"} title={"Login"}/>
            <NavItem path={"/register"} title={"Registration"}/>
            <NavItem path={"/restore"} title={"Restore password"}/>
            <NavItem path={"/newPassword"} title={"New password"}/>
            <NavItem path={"/packs"} title={"Packs"}/>
        </nav>
    );
};

export default Nav;
