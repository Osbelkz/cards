import classes from './Packs.module.scss';
import React, {useCallback, useMemo} from 'react';
import {CardPackType} from "../../../n1-main/m3-dal/packs-api";
import Table, {ITableModel} from '../../../n1-main/m1-ui/common/Table/Table';
import {StatusType} from "../../../n1-main/m2-bll/reducers/app-reducer";
import {Search} from "../../../n1-main/m1-ui/common/Search/Search";
import {SearchParamsType} from "../../../n1-main/m2-bll/reducers/packs-reducer";
import {Paginator} from "../../../n1-main/m1-ui/common/Paginator/Paginator";
import {ColumnSorting} from "../../../n1-main/m1-ui/common/ColumnSorting/ColumnSorting";
import moment from "moment";
import {PackButtonsBlock} from "../../../n1-main/m1-ui/common/Table/PackButtonsBlock";
import {AddPackBlock} from "../../../n1-main/m1-ui/common/Table/AddPackBlock";
import {Checkbox} from "../../../n1-main/m1-ui/common/Checkbox/Checkbox";

type PropsType = {
    packs: Array<CardPackType>
    userId: string | undefined
    page: number
    pageCount: number
    min: number
    max: number
    cardPacksTotalCount: number
    searchParams: SearchParamsType
    deletePack: (id: string) => void
    createPack: (name: string) => void
    updatePack: (name: string, id: string) => void
    changePage: (page: number) => void
    changePageCount: (page: number) => void
    setSearchParams: (searchName: string, min: number, max: number) => void
    choosePack: (packId: string, cardsOwner: string) => void
    startLearn: (packId: string, cardsOwner: string) => void
    setPacksSortColumn: (sortPacks: string) => void
    pageStatus: StatusType
    setGettingMyPacks: (checkboxValue: boolean) => void
}

const Packs: React.FC<PropsType> = React.memo((props) => {
    let {packs, userId, page, setPacksSortColumn,
        pageCount, cardPacksTotalCount, createPack,
        deletePack, updatePack, changePage, choosePack,
        changePageCount, setSearchParams, pageStatus,
        min, max, searchParams: {packName, user_id}, startLearn, setGettingMyPacks
    } = props

    const sortCardsCount = useCallback((sort: number)=>setPacksSortColumn(sort+"cardsCount"),[])

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i: number) => (<th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                <div>Name</div>
            </th>),
            render: (d: CardPackType, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    {d.name}
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
                    <AddPackBlock createPack={createPack} pageStatus={pageStatus} />
                </th>
            ),
            render: (d: CardPackType, i: number) => {
                return <td style={{width: "15%", textAlign: "right", minHeight: "100%", display: "flex"}} key={i}>
                    <PackButtonsBlock updatePack={updatePack}
                                      choosePack={choosePack}
                                      startLearn={startLearn}
                                      deletePack={deletePack}
                                      owner={userId===d.user_id} pack={d}
                                      pageStatus={pageStatus}/>
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
                    <Checkbox
                                     onChange={setGettingMyPacks}
                                     title={"view just own packs"}
                                     checked={!!user_id}
                                     disabled={pageStatus=== "loading"}/>
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
        </div>
    );
})

export default Packs;
