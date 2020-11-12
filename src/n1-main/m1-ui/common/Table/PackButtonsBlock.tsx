import React, {useState} from "react";
import {QuestionModalContainer} from "../ModalWindows/QuestionModal/QuestionModalContainer";
import {OneInputModal} from "../ModalWindows/OneInputModal/OneInputModal";
import {StatusType} from "../../../m2-bll/reducers/app-reducer";
import {CardPackType} from "../../../m3-dal/packs-api";
import {GeneralBTN} from "./GeneralBTN/GeneralBTN";

type PackButtonsBlockPropsType = {
    updatePack: (name: string, id: string) => void
    choosePack: (packId: string, cardsOwner: string) => void
    startLearn: (packId: string, cardsOwner: string) => void
    deletePack: (id: string) => void
    owner: boolean
    pack: CardPackType
    pageStatus: StatusType
}

export const PackButtonsBlock: React.FC<PackButtonsBlockPropsType> = React.memo(({
                                                                                     updatePack, choosePack, startLearn,
                                                                                     deletePack, owner,
                                                                                     pageStatus, pack
                                                                                 }) => {
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeletePackModal, setShowDeletePackModal] = useState(false)
    const {_id, cardsCount, user_id, name} = pack

    return <>
        <GeneralBTN btnType={"edit"} onClick={() => setShowEditModal(true)}
                 disabled={!owner || pageStatus === "loading"}/>
        <GeneralBTN btnType={"open"} onClick={() => choosePack(_id, user_id)}
                    disabled={pageStatus === "loading"}/>
        <GeneralBTN btnType={"train"} onClick={() => startLearn(_id, user_id)}
                  disabled={pageStatus === "loading" || cardsCount === 0}/>
        <GeneralBTN btnType={"remove"} onClick={() => setShowDeletePackModal(true)}
                   disabled={!owner || pageStatus === "loading"}/>
        {owner && <><OneInputModal
                value={name}
                placeholder={"pack's name"}
                title={"Edit pack's name"}
                active={showEditModal}
                setActive={setShowEditModal}
                handleOnSubmit={(text) => updatePack(text, _id)}/>
            <QuestionModalContainer text={"Delete this pack?"}
                                    activate={showDeletePackModal}
                                    setActivate={setShowDeletePackModal}
                                    setAnswerY={() => deletePack(_id)}
                                    setAnswerN={() => {
                                    }}/>
        </>}
    </>
})