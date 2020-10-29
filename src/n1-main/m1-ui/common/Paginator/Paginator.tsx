import React, {ChangeEvent, useState} from "react";
import classes from "./Paginator.module.scss";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";

type PaginatorPropsType = {
    currentPage: number
    cardPacksTotalCount: number
    pageCount: number
    changePage: (page: number) => void
    changePageCount: (page: number) => void
}

export const Paginator = (props: PaginatorPropsType) => {
    const [pageNumber, setPageNumber] = useState(props.currentPage)
    const [pageCount, setPageCount] = useState(props.pageCount)
    let pageAmount = Math.ceil(props.cardPacksTotalCount / props.pageCount)

    const pageCountOnChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        let value = +e.currentTarget.value
        setPageCount(value)
        props.changePageCount(value)
    }
    const onePreviousPage = () => {
        let value = props.currentPage - 1
        props.changePage(value)
        setPageNumber(value)
    }
    const pageNumberOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = +e.currentTarget.value
        setPageNumber(value)
        props.changePage(value)
    }
    const oneNextPage = () => {
        let value = props.currentPage + 1
        props.changePage(value)
        setPageNumber(value)
    }

    return <div className={classes.paginator}>
        {`Items per page:`}
        <select onChange={pageCountOnChangeHandler} value={pageCount}>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
        </select>
        <Button
            btnName={`Prev`}
            onClick={onePreviousPage}
            disabled={props.currentPage < 2}
        />
        {`Page: `}
        <Input type={"number"}
               value={pageNumber}
               step={1} min={0}
               max={pageAmount}
               onChange={pageNumberOnChangeHandler}
        />
        of {pageAmount}
        <Button
            btnName={`Next`}
            onClick={oneNextPage}
            disabled={props.currentPage === pageAmount}
        />

    </div>
}