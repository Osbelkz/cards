import classes from './Cards.module.scss';
import React, {useCallback, useMemo} from 'react';
import Table, {ITableModel} from '../../../n1-main/m1-ui/common/Table/Table';
import {StatusType} from "../../../n1-main/m2-bll/reducers/app-reducer";
import {Search} from "../../../n1-main/m1-ui/common/Search/Search";
import {CardsSearchParamsType} from '../../../n1-main/m2-bll/reducers/cards-reducer';
import {CardType} from "../../../n1-main/m3-dal/cards-api";
import {Paginator} from "../../../n1-main/m1-ui/common/Paginator/Paginator";
import {ColumnSorting} from "../../../n1-main/m1-ui/common/ColumnSorting/ColumnSorting";
import moment from "moment";
import {CardButtonsBlock} from "../../../n1-main/m1-ui/common/Table/CardButtonsBlock";
import {AddCardBlock} from "../../../n1-main/m1-ui/common/Table/AddCardBlock";


type PropsType = {
    cards: Array<CardType>
    owner: boolean
    page: number
    pageCount: number
    min: number
    max: number
    cardsTotalCount: number
    searchParams: CardsSearchParamsType
    deleteCard: (id: string) => void
    createCard: (question: string, answer: string) => void
    updateCard: (cardId: string, question: string, answer: string) => void
    changePage: (page: number) => void
    changePageCount: (page: number) => void
    setSearchParams: (searchName: string, min: number, max: number) => void
    pageStatus: StatusType
    setSortColumn: (sortCards: string) => void
}

const Cards: React.FC<PropsType> = React.memo((props) => {
    let {
        cards, page, owner, setSortColumn,
        pageCount, cardsTotalCount,
        createCard, deleteCard, updateCard, changePage,
        changePageCount, setSearchParams, pageStatus,
        min, max, searchParams: {cardQuestion}
    } = props

    const sortGrade = useCallback((sort: number) => setSortColumn(sort + "grade"), [])

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i: number) => (<th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                <span>Question</span>
            </th>),
            render: (d: CardType, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.question}</div>
                </td>)
        },
        {
            title: (i: number) => (<th style={{width: "30%"}} key={i}>Answer</th>),
            render: (d: CardType, i: number) => (
                <td style={{width: "30%"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.answer}</div>
                </td>)
        },
        {
            title: (i: number) => (<th style={{width: "15%"}} key={i}>
                <span>Added</span>
            </th>),
            render: (d: CardType, i: number) => {
                return <td style={{width: "15%"}} key={i}>{moment(d.created).format('Do MMM YY')}</td>
            }

        },
        {
            title: (i: number) => (
                <th style={{width: "15%", display: "flex", alignItems: "center"}} key={i}>
                    <div>Grade</div>
                    <ColumnSorting onClick={sortGrade} pageStatus={pageStatus}/>
                </th>),
            render: (d: CardType, i: number) => (
                <td style={{width: "15%"}} key={i}>{d.grade.toFixed(2)}</td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "10%", paddingRight: "20px", textAlign: "right"}} key={i}>
                    <AddCardBlock createCard={createCard} pageStatus={pageStatus} owner={owner}/>
                </th>
            ),
            render: (d: CardType, i: number) => {

                return <td style={{width: "15%", textAlign: "right", minHeight: "100%", display: "flex"}} key={i}>
                    <CardButtonsBlock
                        deleteCard={deleteCard}
                        updateCard={updateCard}
                        owner={owner}
                        pageStatus={pageStatus}
                        card={d}/>
                </td>
            }
        },

    ]), [pageStatus, owner])

    return (
        <div className={classes.packs}>
            <div className={classes.packs__container}>
                <div className={classes.packs__title}>
                    <h3>Cards</h3>
                </div>
                <div className={classes.packs__body}>
                    <Search name={cardQuestion}
                            label={"Search"}
                            minValue={min}
                            maxValue={max}
                            stepValue={1}
                            disabled={props.pageStatus === "loading"}
                            setSearchParams={setSearchParams}/>
                    <Table data={cards}
                           model={testModel}
                           disabled={props.pageStatus === "loading"}/>
                    <Paginator currentPage={page}
                               itemsTotalCount={cardsTotalCount}
                               pageCount={pageCount}
                               changePage={changePage}
                               changePageCount={changePageCount}
                               disabled={props.pageStatus === "loading"}
                               itemsName={"cards"}/>
                </div>
            </div>
        </div>
    )
})

export default Cards
