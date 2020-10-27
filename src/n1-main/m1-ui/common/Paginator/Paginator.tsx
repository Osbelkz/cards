import React from "react";
import classes from "./Paginator.module.scss";
import {Button} from "../Button/Button";

type PaginatorPropsType = {
    currentPage: number
    pageAmount: number
    changePage: (page: number) => void
}

export const Paginator = (props: PaginatorPropsType) => {
    const firstButton = props.currentPage - 2
    const secondButton = props.currentPage - 1
    const thirdButton = props.currentPage
    const fourthButton = props.currentPage + 1
    const fifthButton = props.currentPage + 2
    const tenPreviousPage = () => {
        props.changePage(props.currentPage - 10)
    }
    const onFirstPage = () => {
        props.changePage(1)
    }
    const onePreviousPage = () => {
        props.changePage(props.currentPage - 1)
    }
    const twoPreviousPage = () => {
        props.changePage(props.currentPage - 2)
    }
    const oneNextPage = () => {
        props.changePage(props.currentPage + 1)
    }
    const twoNextPage = () => {
        props.changePage(props.currentPage + 2)
    }
    const onLastPage = () => {
        props.changePage(props.pageAmount)
    }
    const tenNextPage = () => {
        props.changePage(props.currentPage + 10)
    }
    return <div className={classes.paginator}>
        <Button btnName={"<<"} btnType={"green"} onClick={tenPreviousPage} disabled={props.currentPage < 11}/>
        {props.currentPage > 3 ? <Button btnName={"1"} btnType={"green"} onClick={onFirstPage}/> : ""}
        {"..."}
        {props.currentPage > 2 ? <Button btnName={`${firstButton}`} btnType={"green"} onClick={twoPreviousPage}/> : ""}
        {props.currentPage > 1 ? <Button btnName={`${secondButton}`} btnType={"green"} onClick={onePreviousPage}/> : ""}
        <Button btnName={`${thirdButton}`} btnType={"green"} style={{borderColor: "black"}}/>
        {props.currentPage < props.pageAmount ? <Button btnName={`${fourthButton}`} btnType={"green"} onClick={oneNextPage}/> : ""}
        {props.currentPage < (props.pageAmount-1) ? <Button btnName={`${fifthButton}`} btnType={"green"} onClick={twoNextPage}/> : ""}
        {"..."}
        {props.currentPage < (props.pageAmount-2) ? <Button btnName={`${props.pageAmount}`} btnType={"green"} onClick={onLastPage}/> : ""}
        <Button btnName={">>"} btnType={"green"} onClick={tenNextPage} disabled={props.currentPage > props.pageAmount - 10}/>
    </div>
}