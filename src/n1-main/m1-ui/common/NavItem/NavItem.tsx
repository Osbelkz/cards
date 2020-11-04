import React from 'react';
import {NavLink} from "react-router-dom";
import classes from "./NavItem.module.css";

type PropsType = {
    path: string
    title: string
}

const NavItem: React.FC<PropsType> = ({path, title}) => {

    return (
            <NavLink to={path} className={classes.navItem} activeClassName={classes.active}>{title}</NavLink>
    );
};

export default NavItem;
