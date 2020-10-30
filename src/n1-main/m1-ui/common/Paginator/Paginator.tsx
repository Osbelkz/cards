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
    const [pageNumber, setPageNumber] = useState(props.currentPage)
    let pageAmount = Math.ceil(props.itemsTotalCount / props.pageCount)

    const pageCountChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        let value = +e.currentTarget.value
        props.changePageCount(value)
    }
    const onePreviousPage = () => {
        props.changePage(pageNumber - 1)
        setPageNumber(pageNumber - 1)
    }
    const pageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPageNumber(+e.currentTarget.value)
    }
    const pageSetHandler = () => {
        if (pageNumber < 1) {
            props.changePage(1)
            setPageNumber(1)
        } else if (pageNumber > pageAmount) {
            props.changePage(pageAmount)
            setPageNumber(pageAmount)
        } else {
            props.changePage(pageNumber)
        }
    }
    const oneNextPage = () => {
        props.changePage(pageNumber + 1)
        setPageNumber(pageNumber + 1)
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
            {pageNumber < 1}
            <Input type={"number"}
                   value={pageNumber}
                   step={1} min={1}
                   max={pageAmount}
                   onChange={pageChangeHandler}
                   onBlur={pageSetHandler}
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
