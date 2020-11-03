import React, {ChangeEvent, useCallback, useState} from "react";
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

export const Search: React.FC<SearchPropsType> =
    React.memo(({name, minValue, maxValue, label, stepValue, setSearchParams}) => {

    const [searchValue, setSearchValue] = useState(name)
    const [min, setMin] = useState(minValue)
    const [max, setMax] = useState(maxValue)

    const inputOnChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }, [])

    const onSearchClick = useCallback(() => {
        setSearchParams(searchValue, min, max)
    }, [])

    return <div className={classes.uniSearch}>
        <h3>{label}</h3>
        <Input
            value={searchValue}
            onChange={inputOnChangeHandler}
        />
        <div className={classes.slider}>
            <Slider
                setMin={setMin}
                setMax={setMax}
                min={min}
                max={max}
                minValue={minValue}
                maxValue={maxValue}
                stepValue={stepValue}
            />
        </div>
            <Button
                btnName={"Search"}
                onClick={onSearchClick}
            />
    </div>
})
