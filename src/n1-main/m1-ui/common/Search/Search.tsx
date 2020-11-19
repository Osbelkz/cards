import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import classes from "./Search.module.scss";
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import {Slider} from "../Slider/Slider";

type SearchPropsType = {
    name: string
    label: string
    minValue: number
    maxValue: number
    stepValue: number
    setSearchParams: (searchName: string, min: number, max: number) => void
    disabled: boolean
}

export const Search: React.FC<SearchPropsType> =
    React.memo(({name, minValue, maxValue, label, stepValue, setSearchParams, disabled}) => {


        const [searchValue, setSearchValue] = useState<string>(name)
        const [min, setMin] = useState(minValue)
        const [max, setMax] = useState(maxValue)

        const inputOnChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.currentTarget.value as string)
        }, [])

        const onSearchClick = useCallback(() => {
            setSearchParams(searchValue, min, max)
        }, [searchValue, max, min])

        useEffect(() => {
            setMax(maxValue)
        }, [maxValue])

        return <div className={classes.uniSearch}>
            <h3>{label}</h3>
            <Input
                value={searchValue}
                onChange={inputOnChangeHandler}
                disabled={disabled}
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
                    disabled={disabled}
                />
            </div>
            <Button
                btnName={"Search"}
                onClick={onSearchClick}
                disabled={disabled}
            />
        </div>
    })
