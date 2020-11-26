import React, {useCallback, useEffect} from 'react';
import Packs from "./Packs";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../n1-main/m2-bll/store";
import {
    changePagePacks,
    changePageCountPacks,
    createPack,
    deletePack,
    getPacks,
    PacksStateType,
    setPacksSortColumn,
    setSearchParams,
    setUserIdAC,
    updatePack
} from "../../../n1-main/m2-bll/reducers/packs-reducer";
import {Preloader} from "../../../n1-main/m1-ui/common/Preloader/Preloader";
import {useHistory} from 'react-router-dom';

const PacksContainer = React.memo(() => {

    // console.log("packs container")
    const history = useHistory()
    const dispatch = useDispatch()
    const {packs, min, max, page, pageCount, cardPacksTotalCount, pageStatus, searchParams, getMyPacks} =
        useSelector<RootStateType, PacksStateType>(state => state.packs)
    const userId = useSelector<RootStateType, string | undefined>(state => state.login.userData?._id)


    const deletePackHandler = useCallback((id: string) => {
        dispatch(deletePack(id))
    }, [])
    const createPackHandler = useCallback((name: string) => {
        dispatch(createPack(name))
    }, [])
    const updatePackHandler = useCallback((name: string, _id: string) => {
        dispatch(updatePack({name, _id}))
    }, [])
    const changePageHandler = useCallback((page: number) => {
        dispatch(changePagePacks({page}))
    }, [])
    const changePageCountHandler = useCallback((pageCount: number) => {
        dispatch(changePageCountPacks({pageCount}))
    }, [])
    const setSearchParamsHandler = useCallback((packName: string, min: number, max: number) => {
        dispatch(setSearchParams({packName, min, max}))
    }, [])
    const setPacksSortColumnHandler = useCallback((sortPacks: string) => {
        dispatch(setPacksSortColumn({sortPacks}))
    }, [])
    const choosePackHandler = useCallback((packId: string) => {
        history.push(`/cards/${packId}`)
    }, [])
    const startLearnHandler = useCallback((packId: string) => {
        history.push(`/learn/${packId}`)
    }, [])
    const setGettingMyPacks = (checkboxValue: boolean) => {
        if (checkboxValue) {
            dispatch(setUserIdAC({user_id: userId as string}))
        } else {
            dispatch(setUserIdAC({user_id: ""}))
        }
    }

    useEffect(() => {
        dispatch(getPacks())
    }, [page, pageCount, searchParams, getMyPacks])

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
               startLearn={startLearnHandler}
               setPacksSortColumn={setPacksSortColumnHandler}
               changePageCount={changePageCountHandler}
               setSearchParams={setSearchParamsHandler}
               pageStatus={pageStatus}
               setGettingMyPacks={setGettingMyPacks}
        />
    );
})

export default PacksContainer;
