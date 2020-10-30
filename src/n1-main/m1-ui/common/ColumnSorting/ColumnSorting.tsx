import React from "react";
import classes from "./ColumnSorting.module.scss";
import {Button} from "../Button/Button";

type ColumnSortingPropsType = {
    onClick: (value: number) => void
}

export const ColumnSorting = (props: ColumnSortingPropsType) => {
    const upChangeHandler = () => {
        props.onClick(1)
    }
    const downChangeHandler = () => {
        props.onClick(0)
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
