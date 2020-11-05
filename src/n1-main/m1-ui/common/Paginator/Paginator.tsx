import React, {ChangeEvent, useState} from "react";
import classes from "./Paginator.module.scss";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";
import {StatusType} from "../../../m2-bll/reducers/app-reducer";

type PaginatorPropsType = {
    currentPage: number
    itemsTotalCount: number
    pageCount: number
    changePage: (page: number) => void
    changePageCount: (page: number) => void
    itemsName: string
    pageStatus: StatusType
}

export const Paginator: React.FC<PaginatorPropsType> =
    React.memo(({currentPage, pageCount, changePageCount, changePage, itemsName, itemsTotalCount, pageStatus}) => {
    const [pageNumber, setPageNumber] = useState(currentPage)
    let pageAmount = Math.ceil(itemsTotalCount / pageCount)

    const pageCountChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        let value = +e.currentTarget.value
        changePageCount(value)
    }
    const onePreviousPage = () => {
        changePage(pageNumber - 1)
        setPageNumber(pageNumber - 1)
    }
    const pageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPageNumber(+e.currentTarget.value)
    }

    const pageSetHandler = () => {
        if (pageNumber < 1) {
            changePage(1)
            setPageNumber(1)
        } else if (pageNumber > pageAmount) {
            changePage(pageAmount)
            setPageNumber(pageAmount)
        } else {
            changePage(pageNumber)
        }
    }
    const oneNextPage = () => {
        changePage(pageNumber + 1)
        setPageNumber(pageNumber + 1)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            pageSetHandler()
        }
    }

    return <div className={classes.paginator}>
        <div className={classes.leftBlock}>
            {`Total ${itemsName}: ${itemsTotalCount}. ${itemsName} per page:`}
            <select onChange={pageCountChangeHandler} value={pageCount} disabled={pageStatus === "loading"}>
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
                disabled={currentPage < 2 || pageStatus === "loading"}
            />
            {`Page: `}
            {pageNumber < 1}
            <Input type={"number"}
                   value={pageNumber}
                   step={1} min={1}
                   max={pageAmount}
                   onChange={pageChangeHandler}
                   onBlur={pageSetHandler}
                   onKeyPress={onKeyPressHandler}
                   disabled={pageStatus === "loading"}
            />
            of {pageAmount}
            <Button
                btnName={`Next`}
                onClick={oneNextPage}
                disabled={currentPage === pageAmount || pageStatus === "loading"}
            />
        </div>
    </div>
})
