import classes from './Packs.module.scss';
import React from 'react';
import {CardPackType} from "../../../n1-main/m3-dal/packs-api";
import Table, {ITableModel} from '../../../n1-main/m1-ui/common/Table/Table';
import {StatusType} from "../../../n1-main/m2-bll/reducers/app-reducer";
import {Preloader} from "../../../n1-main/m1-ui/common/Preloader/Preloader";

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
                                        setSearchParams,
                                        pageStatus
                                    }) => {

    console.log("packs")

    const testModel: ITableModel[] = [
        {
            title: (i: number) => (<div style={{flex: "1 1 30%", padding: "10px 0 10px 10px"}} key={i}>name</div>),
            render: (d: CardPackType, i: number) => (
                <div style={{flex: "1 1 30%", padding: "10px 0 10px 10px"}} key={i}>{d.name}</div>)
        },
        {
            title: (i: number) => (<div style={{flex: "1 1 10%", padding: "10px 0"}} key={i}>cards count</div>),
            render: (d: CardPackType, i: number) => (
                <div style={{flex: "1 1 10%", padding: "10px 0"}} key={i}>{d.cardsCount}</div>)
        },
        {
            title: (i: number) => (<div style={{flex: "1 1 30%", padding: "10px 0"}} key={i}>owner</div>),
            render: (d: CardPackType, i: number) => (
                <div style={{flex: "1 1 30%", padding: "10px 0"}} key={i}>{d.user_name}</div>)
        },
        {
            title: (i: number) => (
                <div style={{flex: "1 1 50px",padding: "10px 10px 10px 0"}} key={i}>
                    buttons
                    <button onClick={() => createPack("new pack")}>+</button>
                </div>
            ),
            render: (d: CardPackType, i: number) => (
                <div style={{flex: "1 1 50px", padding: "10px 10px 10px 0"}} key={i}>
                    <button onClick={() => deletePack(d._id)} disabled={userId !== d.user_id || pageStatus==="loading"}>"X"</button>
                    <button onClick={() => updatePack("update pack name", d._id)}
                            disabled={userId !== d.user_id || pageStatus==="loading"}>"update"
                    </button>
                </div>
            )
        },

    ];

    if (!packs || pageStatus==="idle") {
        return <Preloader/>
    }

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
};

export default Packs;
