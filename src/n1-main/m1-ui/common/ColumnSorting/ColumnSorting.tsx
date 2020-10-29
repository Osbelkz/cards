import React from "react";
import classes from "./ColumnSorting.module.scss";
import {Button} from "../Button/Button";

type ColumnSortingPropsType = {
    onClick: (value: string) => void
}

export const ColumnSorting = (props: ColumnSortingPropsType) => {
    const upChangeHandler = () => {
        props.onClick("up")
    }
    const downChangeHandler = () => {
        props.onClick("down")
    }

    return <div className={classes.container}>
        <Button
            btnName={"⇑"}
            className={classes.up}
            onClick={upChangeHandler}
        />
        <Button
            btnName={"⇓"}
            className={classes.down}
            onClick={downChangeHandler}
        />
    </div>
}