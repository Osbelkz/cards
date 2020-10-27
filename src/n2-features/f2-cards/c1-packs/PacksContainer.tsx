import React, {useCallback, useEffect} from 'react';
import Packs from "./Packs";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {CardPackType} from "../../../n1-main/m3-dal/packs-api";
import {
    changePageAC,
    changePageCountAC,
    createPackTC,
    deletePackTC,
    getPacksTC, setSearchParamsAC,
    updatePackTC
} from "../../../n1-main/m2-bll/reducers/packs-reducer";


const PacksContainer = () => {


    const dispatch = useDispatch()
    const packs = useSelector<RootStateType, Array<CardPackType> | null>(state => state.packs.packs)
    const page = useSelector<RootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<RootStateType, number>(state => state.packs.pageCount)
    const cardPacksTotalCount = useSelector<RootStateType, number>(state => state.packs.cardPacksTotalCount)
    const min = useSelector<RootStateType, number | undefined>(state => state.packs.max)
    const max = useSelector<RootStateType, number | undefined>(state => state.packs.min)
    const searchName = useSelector<RootStateType, string | undefined>(state => state.packs.packName)


    useEffect(() => {
        dispatch(getPacksTC())
    }, [page, pageCount, min, max, searchName])

    const deletePackHandler = useCallback((id: string) => {
        dispatch(deletePackTC(id))
    }, [dispatch])
    const createPackHandler = useCallback((name: string) => {
        dispatch(createPackTC(name))
    }, [dispatch])
    const updatePackHandler = useCallback((name: string, id: string) => {
        dispatch(updatePackTC(name, id))
    }, [dispatch])
    const changePageHandler = useCallback((page: number) => {
        dispatch(changePageAC(page))
    }, [dispatch])
    const changePageCountHandler = useCallback((pageCount: number) => {
        dispatch(changePageCountAC(pageCount))
    }, [dispatch])
    const setSearchParamsHandler = useCallback((searchName?: string, min?: number, max?: number) => {
        dispatch(setSearchParamsAC(searchName, min, max))
    }, [dispatch])

    return (
        <Packs packs={packs}
               page={page}
               pageCount={pageCount}
               cardPacksTotalCount={cardPacksTotalCount}
               createPack={createPackHandler}
               deletePack={deletePackHandler}
               updatePack={updatePackHandler}
               changePage={changePageHandler}
               changePageCount={changePageCountHandler}
               setSearchParams={setSearchParamsHandler}
        />
    );
};

export default PacksContainer;