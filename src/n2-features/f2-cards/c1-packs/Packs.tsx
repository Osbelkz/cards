import classes from './Packs.module.scss';
import React, {ReactNode} from 'react';
import {CardPackType} from "../../../n1-main/m3-dal/packs-api";
import Table, {ITableModel} from '../../../n1-main/m1-ui/common/Table/Table';

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
}

export type TableRowType = {
    key: string
    name: string
    rating: number
    buttons: ReactNode
}


const Packs: React.FC<PropsType> = ({
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
                                        setSearchParams
                                    }) => {

    // @ts-ignore

    const testModel: ITableModel[] = [
        {
            title: (i: number) => (<div style={{flex: "1 1 30%", padding: "10px 0"}} key={i}>name</div>),
            render: (d: CardPackType) => (<div style={{flex: "1 1 30%", padding: "10px 0"}} key={d._id}>{d.name}</div>)
        },
        {
            title: (i: number) => (<div style={{flex: "1 1 30%", padding: "10px 0"}} key={i}>cards count</div>),
            render: (d: CardPackType) => (
                <div style={{flex: "1 1 30%", padding: "10px 0"}} key={d._id}>{d.cardsCount}</div>)
        },
        {
            title: (i: number) => (<div style={{flex: "1 1 30%", padding: "10px 0"}} key={i}>owner</div>),
            render: (d: CardPackType) => (
                <div style={{flex: "1 1 30%", padding: "10px 0"}} key={d._id}>{d.user_name}</div>)
        },
        {
            title: (i: number) => (
                <div style={{flex: "1 1 10%", padding: "10px 0"}} key={i}>
                    buttons
                    <button onClick={() => createPack("new pack")}>+</button>
                </div>
            ),
            render: (d: CardPackType) => (
                <div style={{flex: "1 1 10%", padding: "10px 0"}} key={d._id}>
                    <button onClick={() => deletePack(d._id)} disabled={userId !== d.user_id}>X</button>
                    <button onClick={() => updatePack("update pack name", d._id)} disabled={userId !== d.user_id}>update</button>
                </div>
            )
        },

    ];

    if (!packs) {
        return <div></div>
    }

    return (
        <div className={classes.packs}>
            <div>{cardPacksTotalCount}</div>
            <Table data={packs} model={testModel}/>
            <button onClick={() => changePage(page + 1)}>next page</button>
            <button onClick={() => changePage(page - 1)}>prev page</button>
            <div>
                <button onClick={() => setSearchParams("react")}>search react</button>
            </div>
            <div>
                <button onClick={() => setSearchParams(undefined, 16)}>search min 16 cards</button>
            </div>
        </div>
    );
};

export default Packs;
