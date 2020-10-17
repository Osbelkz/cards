import React from 'react';
import classes from "./Profile.module.css";
import {Button} from "../common/Button/Button";
import {Input} from "../common/Input/Input";


const Profile = () => {

    return (
        <div className={classes.profile}>
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

export default Profile;
