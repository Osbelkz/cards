import classes from './Packs.module.scss';
import React, {ReactNode} from 'react';
import {CardPackType} from "../../../n1-main/m3-dal/packs-api";

type PropsType = {
    packs: Array<CardPackType> | null
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
    let tableData: Array<TableRowType> = packs?.map(pack => ({
        key: pack._id,
        name: pack.name,
        rating: pack.rating,
        buttons: <>
            <button onClick={() => deletePack(pack._id)}>delete</button>
            <button onClick={() => updatePack("update pack name", pack._id)}>update</button>
        </>
    }))

    return (
        <div className={classes.packs}>
            {
                packs?.map(pack => {
                    return <div>
                        <div>
                            <div>{pack.name}</div>
                            <button onClick={() => deletePack(pack._id)}>delete</button>
                            <button onClick={() => createPack("new pack")}>create</button>
                            <button onClick={() => updatePack("update pack name", pack._id)}>update</button>
                        </div>

                    </div>
                })
            }
            <button onClick={() => changePage(page + 1)}>next page</button>
            <button onClick={() => changePage(page - 1)}>prev page</button>
            <div><button onClick={()=>setSearchParams("react")}>search react</button></div>
            <div><button onClick={()=>setSearchParams(undefined,16)}>search min 16 cards</button></div>
            <div>{cardPacksTotalCount}</div>
            {/*<Table data={tableData}/>*/}
        </div>
    );
};

export default Packs;
