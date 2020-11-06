import classes from './Packs.module.scss';
import React, {useCallback, useMemo, useState} from 'react';
import {CardPackType} from "../../../n1-main/m3-dal/packs-api";
import Table, {ITableModel} from '../../../n1-main/m1-ui/common/Table/Table';
import {StatusType} from "../../../n1-main/m2-bll/reducers/app-reducer";
import EditableTableCell from '../../../n1-main/m1-ui/common/Table/EditableTableCell/EditableTableCell';
import {Search} from "../../../n1-main/m1-ui/common/Search/Search";
import { TableButton } from '../../../n1-main/m1-ui/common/Table/TableButton/TableButton';
import {SearchParamsType} from "../../../n1-main/m2-bll/reducers/packs-reducer";
import {Paginator} from "../../../n1-main/m1-ui/common/Paginator/Paginator";
import {ColumnSorting} from "../../../n1-main/m1-ui/common/ColumnSorting/ColumnSorting";
import {QuestionModalContainer} from "../../../n1-main/m1-ui/common/ModalWindows/QuestionModal/QuestionModalContainer";
import { OneInputModal } from '../../../n1-main/m1-ui/common/ModalWindows/OneInputModal/OneInputModal';
import moment from "moment";

type PropsType = {
    packs: Array<CardPackType>
    userId: string | undefined
    page: number
    pageCount: number
    min: number | undefined
    max: number | undefined
    cardPacksTotalCount: number
    searchParams: SearchParamsType
    deletePack: (id: string) => void
    createPack: (name: string) => void
    updatePack: (name: string, id: string) => void
    changePage: (page: number) => void
    changePageCount: (page: number) => void
    setSearchParams: (searchName?: string, min?: number, max?: number) => void
    choosePack: (packId: string, cardsOwner: string) => void
    startLearn: (packId: string, cardsOwner: string) => void
    setPacksSortColumn: (sortPacks: string) => void
    pageStatus: StatusType
}

const Packs: React.FC<PropsType> = React.memo((props) => {
    let {packs, userId, page, setPacksSortColumn,
        pageCount, cardPacksTotalCount, createPack,
        deletePack, updatePack, changePage, choosePack,
        changePageCount, setSearchParams, pageStatus,
        min, max, searchParams: {packName}, startLearn
    } = props
    // console.log("packs")

    const sortCardsCount = useCallback((sort: number)=>setPacksSortColumn(sort+"cardsCount"),[])
    const [showDeletePackModal, setShowDeletePackModal] = useState(false)
    const [showCreatePackModal, setShowCreatePackModal] = useState(false)

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i: number) => (<th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                <div>Name</div>
            </th>),
            render: (d: CardPackType, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    {
                        userId === d.user_id
                            ? <EditableTableCell text={d.name} changeText={(text) => updatePack(text, d._id)}/>
                            : <span>{d.name}</span>
                    }
                </td>)
        },
        {
            title: (i: number) => (<th style={{width: "15%"}} key={i}>
                <div>Added</div>
            </th>),
            render: (d: CardPackType, i: number) => {

                return <td style={{width: "15%"}} key={i}>{moment(d.created).format('Do MMM YY')}</td>
            }

        },
        {
            title: (i: number) => (<th style={{width: "10%", display: "flex", alignItems: "center"}} key={i}>
                <div>Cards count</div>
                <ColumnSorting onClick={sortCardsCount} pageStatus={pageStatus}/>
            </th>),
            render: (d: CardPackType, i: number) => (
                <td style={{width: "10%"}} key={i}>{d.cardsCount}</td>)
        },
        {
            title: (i: number) => (<th style={{width: "25%"}} key={i}>Owner</th>),
            render: (d: CardPackType, i: number) => (
                <td style={{width: "25%"}} key={i}>{d.user_name}</td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "15%", paddingRight: "20px", textAlign: "right"}} key={i}>
                    <TableButton btnName={"+"} btnType={"green"} onClick={() => setShowCreatePackModal(true)}
                                 disabled={pageStatus === "loading"}/>
                </th>
            ),
            render: (d: CardPackType, i: number) => {
                return <td style={{width: "15%", paddingRight: "20px", textAlign: "right"}} key={i}>
                    <TableButton btnName={"open"}  onClick={() => choosePack(d._id, d.user_id)}
                                 disabled={pageStatus === "loading"}/>
                    <TableButton btnName={"learn"}  onClick={() => startLearn(d._id, d.user_id)}
                                 disabled={pageStatus === "loading" || d.cardsCount === 0}/>
                    <TableButton btnName={"x"} btnType={"red"}  onClick={() => deletePack(d._id)}
                            disabled={userId !== d.user_id || pageStatus === "loading"}/>
                    <QuestionModalContainer text={"Delete this pack?"}
                                            activate={showDeletePackModal}
                                            setActivate={setShowDeletePackModal}
                                            setAnswerY={() => deletePack(d._id)}
                                            setAnswerN={() => {}} />
                </td>
            }
        },

    ]), [pageStatus, showDeletePackModal, showCreatePackModal]);

    return (
        <div className={classes.packs}>
            <div className={classes.packs__container}>

                <div className={classes.packs__title}>
                    <h3>Packs</h3>
                </div>
                <div className={classes.packs__body}>
                    <Search name={packName}
                            label={"Search"}
                            minValue={min?min:0}
                            maxValue={max?max:0}
                            stepValue={1}
                            pageStatus={pageStatus}
                            setSearchParams={setSearchParams}/>
                    <Table data={packs}
                           model={testModel}
                           pageStatus={pageStatus}/>
                    <Paginator currentPage={page}
                               itemsTotalCount={cardPacksTotalCount}
                               pageCount={pageCount}
                               changePage={changePage}
                               changePageCount={changePageCount}
                               pageStatus={pageStatus}
                               itemsName={"packs"} />
                </div>
            </div>
            <OneInputModal title={"Create pack"}
                                    placeholder={"please type a pack name"}
                                    active={showCreatePackModal}
                                    setActive={setShowCreatePackModal}
                                    handleOnSubmit={createPack}
                                    />
        </div>
    );
})

export default Packs;
