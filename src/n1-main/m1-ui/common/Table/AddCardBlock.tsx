import React, {useState} from "react";
import {ThreeInputModal} from "../ModalWindows/ThreeInputModal/ThreeInputModal";
import {TableButton} from "./TableButton/TableButton";
import {StatusType} from "../../../m2-bll/reducers/app-reducer";

type AddCardBlockPropsType = {
    createCard: (question: string, answer: string) => void
    pageStatus: StatusType
    owner: boolean
}

export const AddCardBlock: React.FC<AddCardBlockPropsType> = ({createCard, pageStatus, owner}) => {
    const [showCreateModal, setShowCreateModal] = useState(false)

    return <>
        <TableButton btnName={"+"} btnType={"green"}
                     onClick={() => setShowCreateModal(true)}
                     disabled={!owner || pageStatus === "loading"}/>
        {owner && <><ThreeInputModal title={"Create card"}
                                     handleOnSubmit={createCard}
                                     setActive={setShowCreateModal}
                                     active={showCreateModal}/>
        </>}
    </>
}