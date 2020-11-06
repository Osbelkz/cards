import React from "react";
import classes from "./ColumnSorting.module.scss";
import {Button} from "../Button/Button";
import {StatusType} from "../../../m2-bll/reducers/app-reducer";

type ColumnSortingPropsType = {
    onClick: (value: number) => void
    pageStatus: StatusType
}

export const ColumnSorting: React.FC<ColumnSortingPropsType> = React.memo(({onClick, pageStatus}) => {

    const upChangeHandler = () => {
        onClick(1)
    }
    const downChangeHandler = () => {
        onClick(0)
    }

    return <div className={classes.container}>
        <Button
            btnName={"⇑"}
            className={classes.up}
            onClick={upChangeHandler}
            disabled={pageStatus === "loading"}
        />
        <Button
            btnName={"⇓"}
            className={classes.down}
            onClick={downChangeHandler}
            disabled={pageStatus === "loading"}
        />
    </div>
})