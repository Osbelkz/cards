import React, {ChangeEvent} from "react";
import classes from "./Slider.module.scss";
import {StatusType} from "../../../m2-bll/reducers/app-reducer";

type SliderPropsType = {
    setMin:(value: number) => void
    setMax:(value: number) => void
    min: number
    max: number
    minValue: number
    maxValue: number
    stepValue: number
    pageStatus: StatusType
}

export const Slider: React.FC<SliderPropsType> = React.memo((props) => {

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

    let leftMin = props.min / (props.maxValue/100) - 2.5
    let leftMax = props.max / (props.maxValue/100) - 2.5

    return <div className={classes.doubleRange}>
        <div>
            <div className={classes.rangeNum}
                style={{left: `${leftMin}%`}}>
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
                disabled={props.pageStatus === "loading"}
            />
        </div>

        <div className={classes.rangeNum}
            style={{left: `${leftMax}%`}}>
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
            disabled={props.pageStatus === "loading"}
        />
    </div>
})
