import React, {ChangeEvent, useCallback, useState} from "react";
import classes from "./Search.module.scss";
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import {Slider} from "../Slider/Slider";
import {StatusType} from "../../../m2-bll/reducers/app-reducer";

type SearchPropsType = {
    name: string | undefined
    label: string
    minValue: number
    maxValue: number
    stepValue: number
    setSearchParams: (searchName?: string, min?: number, max?: number) => void
    pageStatus: StatusType
}

export const Search: React.FC<SearchPropsType> =
    React.memo(({name, minValue, maxValue, label, stepValue, setSearchParams, pageStatus}) => {

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
            disabled={pageStatus === "loading"}
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
                pageStatus={pageStatus}
            />
        </div>
            <Button
                btnName={"Search"}
                onClick={onSearchClick}
                disabled={pageStatus === "loading"}
            />
    </div>
})
