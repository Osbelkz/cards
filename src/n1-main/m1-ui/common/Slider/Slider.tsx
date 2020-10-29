import React, {ChangeEvent, useState} from "react";
import classes from "./Slider.module.scss";

type SliderPropsType = {
    setMin:(value: number) => void
    setMax:(value: number) => void
    min: number
    max: number
    minValue: number
    maxValue: number
    stepValue: number
}

export const Slider = (props: SliderPropsType) => {

    const rangeHandler1 = (e: ChangeEvent<HTMLInputElement>) => {
        let value = +e.currentTarget.value
        props.setMin(value)
        if (props.max <= value) {
            props.setMax(value)
        }
    }

    const rangeHandler2 = (e: ChangeEvent<HTMLInputElement>) => {
        let value = +e.currentTarget.value
        props.setMax(value)
        if (props.min >= value) {
            props.setMin(value)
        }
    }

    return <div className={classes.doubleRange}>
        <div
            className={classes.rangeNum}
            style={{left: `${props.min/0.17}%`}}
        >
            {props.min}
        </div>
        <input
            type={"range"}
            min={props.minValue}
            max={props.maxValue}
            step={props.stepValue}
            value={props.min}
            className={classes.range}
            onChange={rangeHandler1}
        />
        <div
            className={classes.rangeNum}
            style={{left: `${props.max/0.17}%`}}
        >
            {props.max}
        </div>
        <input
            type={"range"}
            min={props.minValue}
            max={props.maxValue}
            step={props.stepValue}
            value={props.max}
            className={classes.range}
            onChange={rangeHandler2}
        />
    </div>
}
