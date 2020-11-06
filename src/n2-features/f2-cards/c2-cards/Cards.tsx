import classes from './Cards.module.scss';
import React, {useCallback, useMemo, useState} from 'react';
import Table, {ITableModel} from '../../../n1-main/m1-ui/common/Table/Table';
import {StatusType} from "../../../n1-main/m2-bll/reducers/app-reducer";
import {Search} from "../../../n1-main/m1-ui/common/Search/Search";
import {CardsSearchParamsType} from '../../../n1-main/m2-bll/reducers/cards-reducer';
import {CardType} from "../../../n1-main/m3-dal/cards-api";
import {Paginator} from "../../../n1-main/m1-ui/common/Paginator/Paginator";
import {ColumnSorting} from "../../../n1-main/m1-ui/common/ColumnSorting/ColumnSorting";
import {QuestionModalContainer} from "../../../n1-main/m1-ui/common/ModalWindows/QuestionModal/QuestionModalContainer";
import { ThreeInputModal } from '../../../n1-main/m1-ui/common/ModalWindows/ThreeInputModal/ThreeInputModal';
import moment from "moment";
import RemoveBTN from "../../../n1-main/m1-ui/common/Table/RemoveBTN/RemoveBTN";
import { TableButton } from '../../../n1-main/m1-ui/common/Table/TableButton/TableButton';


type PropsType = {
    cards: Array<CardType>
    owner: boolean
    page: number
    pageCount: number
    min: number | undefined
    max: number | undefined
    cardsTotalCount: number
    searchParams: CardsSearchParamsType
    deleteCard: (id: string) => void
    createCard: (question: string, answer: string) => void
    updateCard: (cardId: string, question: string, answer: string) => void
    changePage: (page: number) => void
    changePageCount: (page: number) => void
    setSearchParams: (searchName?: string, min?: number, max?: number) => void
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
    // console.log("cards")
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const sortGrade = useCallback((sort: number) => setSortColumn(sort + "grade"), [])

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i: number) => (<th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                <span>Question</span>
            </th>),
            render: (d: CardType, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    {d.question}
                    {
                        owner && <TableButton btnName={"edit"} btnType={"green"} onClick={() => setShowEditModal(true)}
                                           disabled={!owner || pageStatus === "loading"}/>
                    }
                    <ThreeInputModal title={"ss"}
                                              handleOnSubmit={(question, answer, comment) => updateCard(d._id, question, answer)}
                                              setActive={setShowEditModal}
                                              firstInputValue={d.question}
                                              secondInputValue={d.answer}
                                                thirdInputValue={d.comments}
                                              active={showEditModal}/>
                </td>)
        },
        {
            title: (i: number) => (<th style={{width: "30%"}} key={i}>Answer</th>),
            render: (d: CardType, i: number) => (
                <td style={{width: "30%"}} key={i}>{d.answer}</td>)
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
                <td style={{width: "15%"}} key={i}>{d.grade}</td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "10%", paddingRight: "20px", textAlign: "right"}} key={i}>
                    <TableButton btnName={"+"} btnType={"green"} onClick={() => setShowCreateModal(true)}
                                 disabled={!owner || pageStatus === "loading"}/>
                </th>
            ),
            render: (d: CardType, i: number) => {

                return <td style={{width: "15%", textAlign: "right"}} key={i}>
                    <RemoveBTN btnName={""} onClick={() => setShowDeleteModal(true)}
                                 disabled={!owner || pageStatus === "loading"}/>
                    <QuestionModalContainer text={"Delete this card?"}
                                            activate={showDeleteModal}
                                            setActivate={setShowDeleteModal}
                                            setAnswerY={() => deleteCard(d._id)}
                                            setAnswerN={() => {}}/>
                </td>
            }
        },

    ]), [pageStatus, owner, showDeleteModal, showEditModal]);

    return (
        <div className={classes.packs}>
            <div className={classes.packs__container}>

                <div className={classes.packs__title}>
                    <h3>Cards</h3>
                </div>
                <div className={classes.packs__body}>
                    <Search name={cardQuestion}
                            label={"Search"}
                            minValue={min ? min : 0}
                            maxValue={max ? max : 0}
                            stepValue={1}
                            pageStatus={pageStatus}
                            setSearchParams={setSearchParams}/>
                    <Table data={cards}
                           model={testModel}
                           pageStatus={pageStatus}/>
                    <Paginator currentPage={page}
                               itemsTotalCount={cardsTotalCount}
                               pageCount={pageCount}
                               changePage={changePage}
                               changePageCount={changePageCount}
                               pageStatus={pageStatus}
                               itemsName={"cards"}/>
                </div>
                <ThreeInputModal title={"Create card"}
                                          handleOnSubmit={createCard}
                                          setActive={setShowCreateModal}
                                          active={showCreateModal}/>
            </div>
        </div>
    );
})

export default Cards;
