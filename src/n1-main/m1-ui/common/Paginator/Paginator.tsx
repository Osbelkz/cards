import React, {ChangeEvent, useState} from "react";
import classes from "./Paginator.module.scss";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";

type PaginatorPropsType = {
    currentPage: number
    itemsTotalCount: number
    pageCount: number
    changePage: (page: number) => void
    changePageCount: (page: number) => void
    itemsName: string
}

export const Paginator = (props: PaginatorPropsType) => {
    let pageAmount = Math.ceil(props.itemsTotalCount / props.pageCount)

    const pageCountChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        props.changePageCount(+e.currentTarget.value)
    }
    const onePreviousPage = () => {
        props.changePage(props.currentPage - 1)
    }
    const pageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changePage(+e.currentTarget.value)
    }
    const oneNextPage = () => {
        props.changePage(props.currentPage + 1)
    }

    return <div className={classes.paginator}>
        <div className={classes.leftBlock}>
            {`Total ${props.itemsName}: ${props.itemsTotalCount}. ${props.itemsName} per page:`}
            <select onChange={pageCountChangeHandler} value={props.pageCount}>
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
            </select>
        </div>
        <div className={classes.rightBlock}>
            <Button
                btnName={`Prev`}
                onClick={onePreviousPage}
                disabled={props.currentPage < 2}
            />
            {`Page: `}
            <Input type={"number"}
                   value={props.currentPage}
                   step={1} min={1}
                   max={pageAmount}
                   onChange={pageChangeHandler}
            />
            of {pageAmount}
            <Button
                btnName={`Next`}
                onClick={oneNextPage}
                disabled={props.currentPage === pageAmount}
            />
        </div>
    </div>
}