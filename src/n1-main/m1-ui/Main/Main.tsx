import React from 'react';
import Header from "../Header/Header";
import classes from "./Main.module.css";
import {Button} from "../common/Button/Button";
import {Input} from "../common/Input/Input";
import Routes from "../Routes/Routes";

const Main: React.FC = () => {
    return (
        <div className={classes.main}>
            <Header/>
            <br/>
                <Routes />
            <div>
                <br/>
                <div>
                    <div>
                        <h3>Regular</h3>
                        <Button onClick={() => alert("clicked")}
                                btnName={"Button"}/>
                        <Button onClick={() => alert("clicked")}
                                btnName={"Button"}
                                disabled={true}/>
                    </div>
                    <div>
                        <h3>Green</h3>
                        <Button onClick={() => alert("clicked")}
                                btnName={"Button"}
                                btnType={"green"}/>
                        <Button onClick={() => alert("clicked")}
                                btnName={"Button"}
                                btnType={"green"}
                                disabled={true}/>
                    </div>
                    <div>
                        <h3>Red</h3>
                        <Button onClick={() => alert("clicked")}
                                btnName={"Button"}
                                btnType={"red"}/>
                        <Button onClick={() => alert("clicked")}
                                btnName={"Button"}
                                btnType={"red"}
                                disabled={true}/>
                    </div>
                </div>
                <br/>
                <div>
                    <h3>Input</h3>
                    <Input onChange={() => alert("was changed")}
                           value={"sadf"}
                           placeHolder={"input"}/>
                    <Input onChange={() => alert("was changed")}
                           value={""}
                           placeHolder={"input"}
                           disabled={true}/>
                </div>
            </div>
        </div>
    );
};

export default Main;
