import React, {ChangeEvent, useState} from "react";
import classes from "./Search.module.scss";
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import {Slider} from "../Slider/Slider";

type SearchPropsType = {
    name: string | undefined
    label: string
    minValue: number
    maxValue: number
    stepValue: number
    setSearchParams: (searchName?: string, min?: number, max?: number) => void
}

export const Search = (props: SearchPropsType) => {

    const [name, setName] = useState(props.name)
    const [min, setMin] = useState(props.minValue)
    const [max, setMax] = useState(props.maxValue)
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }


    return <div className={classes.uniSearch}>
        <h3>{props.label}</h3>
        <Input
            value={name}
            onChange={inputOnChangeHandler}
        />
        <div className={classes.slider}>
            <Slider
                setMin={setMin}
                setMax={setMax}
                min={min}
                max={max}
                minValue={props.minValue}
                maxValue={props.maxValue}
                stepValue={props.stepValue}
            />
        </div>
            <Button
                btnName={"Search"}
                onClick={() => {
                    props.setSearchParams(name, min, max)
                }}
            />
    </div>
}
