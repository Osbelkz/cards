import classes from './Packs.module.scss';
import React, {useMemo} from 'react';
import {CardPackType} from "../../../n1-main/m3-dal/packs-api";
import Table, {ITableModel} from '../../../n1-main/m1-ui/common/Table/Table';
import {StatusType} from "../../../n1-main/m2-bll/reducers/app-reducer";
import EditableTableCell from '../../../n1-main/m1-ui/common/Table/EditableTableCell/EditableTableCell';

type PropsType = {
    packs: Array<CardPackType> | null
    userId: string | undefined
    page: number
    pageCount: number
    cardPacksTotalCount: number
    deletePack: (id: string) => void
    createPack: (name: string) => void
    updatePack: (name: string, id: string) => void
    changePage: (page: number) => void
    changePageCount: (page: number) => void
    setSearchParams: (searchName?: string, min?: number, max?: number) => void
    pageStatus: StatusType
}

const Packs: React.FC<PropsType> = React.memo(({
                                                   packs,
                                                   userId,
                                                   page,
                                                   pageCount,
                                                   cardPacksTotalCount,
                                                   createPack,
                                                   deletePack,
                                                   updatePack,
                                                   changePage,
                                                   changePageCount,
                                                   setSearchParams,
                                                   pageStatus
                                               }) => {

    console.log("packs")

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i: number) => (<th style={{width: "40%", padding: "10px 0 10px 20px"}} key={i}>
                <span>Name</span>
            </th>),
            render: (d: CardPackType, i: number) => (
                <td style={{width: "40%", padding: "10px 10px 10px 20px"}} key={i}>
                    {
                        userId === d.user_id
                            ? <EditableTableCell text={d.name} changeText={(text) => updatePack(text, d._id)}/>
                            : <span>{d.name}</span>
                    }
                </td>)
        },
        {
            title: (i: number) => (<th style={{width: "20%", padding: "10px 0"}} key={i}>Cards count</th>),
            render: (d: CardPackType, i: number) => (
                <td style={{width: "20%", padding: "10px 0"}} key={i}>{d.cardsCount}</td>)
        },
        {
            title: (i: number) => (<th style={{width: "30%", padding: "10px 0"}} key={i}>Owner</th>),
            render: (d: CardPackType, i: number) => (
                <td style={{width: "30%", padding: "10px 0"}} key={i}>{d.user_name}</td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "80px", padding: "10px 10px 10px 0"}} key={i}>
                    Buttons
                    <button onClick={() => createPack("new pack")}>+</button>
                </th>
            ),
            render: (d: CardPackType, i: number) => {
                return <td style={{width: "80px", padding: "10px 10px 10px 0"}} key={i}>
                    <button onClick={() => deletePack(d._id)}
                            disabled={userId !== d.user_id || pageStatus === "loading"}>X
                    </button>
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

                <Table data={packs} model={testModel} pageStatus={pageStatus}/>

                <div>{cardPacksTotalCount}</div>
                <button onClick={() => changePage(page + 1)}>next page</button>
                <button onClick={() => changePage(page - 1)}>prev page</button>
                <div>
                    <button onClick={() => setSearchParams("new")}>search react</button>
                </div>
                <div>
                    <button onClick={() => setSearchParams(undefined, 16)}>search min 16 cards</button>
                </div>
            </div>
        </div>
    );
})

export default Packs;
