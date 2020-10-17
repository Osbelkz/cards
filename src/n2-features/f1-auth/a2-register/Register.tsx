import React, {useState} from 'react';
import { Input } from '../../../n1-main/m1-ui/common/Input/Input';
import classes from "./Register.module.css";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import axios from "axios"


const Register = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [password2, setPassword2] = useState<string>("")
    const [error, setError] = useState<string>("")

    const onClickHandler = () => {
        // console.log({email: email, password: password})
        // setError("")
        // axios.post("http://localhost:7542/2.0/auth/register", {email: email, password: password})
        //     .then(res=> console.log(res))
        //     .catch(err => setError(err.response.data.error))
    }

    return (
        <div className={classes.register}>
            <div className={classes.register__container}>
                <form className={classes.register__form}>
                    <h3>Registration</h3>
                    <div className={classes.register__inputs}>
                        <div>Email</div>
                        <Input value={email} onChange={setEmail} placeHolder={"email"} />
                        <div>Password (6 or more characters)</div>
                        <Input value={password} onChange={setPassword} placeHolder={"password"} />
                        <div>Repeat password</div>
                        <Input value={password2} onChange={setPassword2} placeHolder={"repeat password"} />
                        {error && <div >{error}</div>}
                    </div>
                    <Button btnName={"Join"} onClick={onClickHandler}/>
                </form>
            </div>
        </div>
    );
};

export default Register;
