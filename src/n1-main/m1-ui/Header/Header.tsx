import React from 'react';
import Routes from "../Routes/Routes";
import classes from "./Header.module.css";

const Header = () => {
    return (
        <div className={classes.header}>
            <Routes/>
        </div>
    );
};

export default Header;
