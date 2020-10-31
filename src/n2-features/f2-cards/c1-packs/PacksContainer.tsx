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
    getPacksTC, PacksStateType, SearchParamsType, setPacksSortColumnAC, setSearchParamsAC,
    updatePackTC
} from "../../../n1-main/m2-bll/reducers/packs-reducer";
import {Preloader} from "../../../n1-main/m1-ui/common/Preloader/Preloader";
import {StatusType} from "../../../n1-main/m2-bll/reducers/app-reducer";
import {setPackAC} from "../../../n1-main/m2-bll/reducers/cards-reducer";
import {useHistory, useParams} from 'react-router-dom';


const PacksContainer = React.memo(() => {

    // console.log("packs container")
    const history = useHistory()
    const dispatch = useDispatch()
    const {
        packs, min, max, page, pageCount, cardPacksTotalCount, pageStatus, searchParams
        } = useSelector<RootStateType, PacksStateType>(state => state.packs)
    const userId = useSelector<RootStateType, string | undefined>(state => state.profile.userData?._id)


    const deletePackHandler = useCallback((id: string) => {
        dispatch(deletePackTC(id))
    }, [])
    const createPackHandler = useCallback((name: string) => {
        dispatch(createPackTC(name))
    }, [])
    const updatePackHandler = useCallback((name: string, id: string) => {
        dispatch(updatePackTC(name, id))
    }, [])
    const changePageHandler = useCallback((page: number) => {
        dispatch(changePageAC(page))
    }, [])
    const changePageCountHandler = useCallback((pageCount: number) => {
        dispatch(changePageCountAC(pageCount))
    }, [])
    const setSearchParamsHandler = useCallback((searchName?: string, min?: number, max?: number) => {
        dispatch(setSearchParamsAC(searchName, min, max))
    }, [])
    const setPacksSortColumnHandler = useCallback((sortPacks: string) => {
        dispatch(setPacksSortColumnAC(sortPacks))
    }, [])
    const choosePackHandler = useCallback((packId: string, cardsOwner: string) => {
        dispatch(setPackAC(packId, cardsOwner))
        history.push(`/cards/${packId}`)
    }, [])

    useEffect(() => {
        dispatch(getPacksTC())
    }, [page, pageCount, searchParams])

    if (!packs || pageStatus === "idle") {
        return <Preloader/>
    }

    return (
        <Packs packs={packs}
               userId={userId}
               page={page}
               min={min}
               max={max}
               pageCount={pageCount}
               searchParams={searchParams}
               cardPacksTotalCount={cardPacksTotalCount}
               createPack={createPackHandler}
               deletePack={deletePackHandler}
               updatePack={updatePackHandler}
               changePage={changePageHandler}
               choosePack={choosePackHandler}
               setPacksSortColumn={setPacksSortColumnHandler}
               changePageCount={changePageCountHandler}
               setSearchParams={setSearchParamsHandler}
               pageStatus={pageStatus}
        />
    );
})

export default PacksContainer;
