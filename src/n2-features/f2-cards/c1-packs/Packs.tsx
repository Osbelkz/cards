import classes from './Packs.module.scss';
import React, {useMemo} from 'react';
import {CardPackType} from "../../../n1-main/m3-dal/packs-api";
import Table, {ITableModel} from '../../../n1-main/m1-ui/common/Table/Table';
import {StatusType} from "../../../n1-main/m2-bll/reducers/app-reducer";
import EditableTableCell from '../../../n1-main/m1-ui/common/Table/EditableTableCell/EditableTableCell';
import {Search} from "../../../n1-main/m1-ui/common/Search/Search";
import { TableButton } from '../../../n1-main/m1-ui/common/Table/TableButton/TableButton';
import {SearchParamsType} from "../../../n1-main/m2-bll/reducers/packs-reducer";
import {Paginator} from "../../../n1-main/m1-ui/common/Paginator/Paginator";
import {ColumnSorting} from "../../../n1-main/m1-ui/common/ColumnSorting/ColumnSorting";

type PropsType = {
    packs: Array<CardPackType> | null
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
    setPacksSortColumn: (sortPacks: string) => void
    pageStatus: StatusType
}

const Packs: React.FC<PropsType> = React.memo((props) => {
    let {packs, userId, page, setPacksSortColumn,
        pageCount, cardPacksTotalCount, createPack,
        deletePack, updatePack, changePage, choosePack,
        changePageCount, setSearchParams, pageStatus,
        min, max, searchParams: {packName}
    } = props
    // console.log("packs")

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i: number) => (<th style={{width: "30%", padding: "10px 0 10px 20px"}} key={i}>
                <div>Name</div>
            </th>),
            render: (d: CardPackType, i: number) => (
                <td style={{width: "30%", padding: "10px 10px 10px 20px"}} key={i}>
                    {
                        userId === d.user_id
                            ? <EditableTableCell text={d.name} changeText={(text) => updatePack(text, d._id)}/>
                            : <span>{d.name}</span>
                    }
                </td>)
        },
        {
            title: (i: number) => (<th style={{width: "15%", padding: "10px 0"}} key={i}>
                <div>Added</div>
            </th>),
            render: (d: CardPackType, i: number) => {

                let dm = new Date(d.created)
                let year = dm.getFullYear()
                let month = dm.getMonth() < 10 ? "0" + dm.getMonth() : dm.getMonth()
                let day = dm.getDay() < 10 ? "0" + dm.getDay() : dm.getDay()

                return <td style={{width: "15%", padding: "10px 0"}} key={i}>{`${year}-${month}-${day}`}</td>
            }

        },
        {
            title: (i: number) => (<th style={{width: "10%", padding: "10px 0", display: "flex", alignItems: "center"}} key={i}>
                <div>Cards count</div>
                <ColumnSorting onClick={(sort)=>setPacksSortColumn(sort+"cardsCount")}/>
            </th>),
            render: (d: CardPackType, i: number) => (
                <td style={{width: "10%", padding: "10px 0"}} key={i}>{d.cardsCount}</td>)
        },
        {
            title: (i: number) => (<th style={{width: "25%", padding: "10px 0"}} key={i}>Owner</th>),
            render: (d: CardPackType, i: number) => (
                <td style={{width: "25%", padding: "10px 0"}} key={i}>{d.user_name}</td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "15%", padding: "10px 20px 10px 0", textAlign: "right"}} key={i}>
                    <TableButton btnName={"+"} btnType={"green"} onClick={() => createPack("new pack")}
                                 disabled={pageStatus === "loading"}/>
                </th>
            ),
            render: (d: CardPackType, i: number) => {
                return <td style={{width: "15%", padding: "10px 20px 10px 0", textAlign: "right"}} key={i}>
                    <TableButton btnName={"open"}  onClick={() => choosePack(d._id, d.user_id)}
                                 disabled={pageStatus === "loading"}/>
                    <TableButton btnName={"x"} btnType={"red"}  onClick={() => deletePack(d._id)}
                            disabled={userId !== d.user_id || pageStatus === "loading"}/>
                </td>
            }
        },

    ]), [pageStatus]);

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
                            setSearchParams={setSearchParams}/>
                    <Table data={packs}
                           model={testModel}
                           pageStatus={pageStatus}/>
                </div>
                <div>
                    <Paginator currentPage={page}
                               itemsTotalCount={cardPacksTotalCount}
                               pageCount={pageCount}
                               changePage={changePage}
                               changePageCount={changePageCount}
                               itemsName={"packs"} />
                </div>
            </div>

        </div>
    );
})

export default Packs;
