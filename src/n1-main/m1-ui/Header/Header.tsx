import React from 'react';
import classes from "./Header.module.css";
import Nav from "./Nav/Nav";

const Header = () => {
    return (
        <div className={classes.header}>
            <Nav/>
        </div>
    );
};
//refactoring
export default Header;
