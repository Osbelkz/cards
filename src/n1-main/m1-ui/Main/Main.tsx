import React from 'react';
import Header from "../Header/Header";
import classes from "./Main.module.css";
import Routes from "../Routes/Routes";

const Main: React.FC = () => {
    return (
        <div className={classes.main}>
            <Header/>
            <Routes/>
        </div>
    );
};

export default Main;
