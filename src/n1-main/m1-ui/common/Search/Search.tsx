import React, {ChangeEvent, useState} from "react";
import classes from "./Search.module.scss";
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";

type SearchPropsType = {
    label: string
}

export const Search = (props: SearchPropsType) => {
    const [name, setName] = useState("")
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    return <div className={classes.uniSearch}>
        <Input
            label={props.label}
            onChange={onChangeHandler}
        />
        <Button
            btnName={"Search"}
            btnType={"green"}
            onClick={() => {alert(name)}}
        />
    </div>
}