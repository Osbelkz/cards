import React, {useState} from "react";
import {OneInputModal} from "../ModalWindows/OneInputModal/OneInputModal";
import {TableButton} from "./TableButton/TableButton";
import {StatusType} from "../../../m2-bll/reducers/app-reducer";

type AddPackBlockPropsType = {
    createPack: (name: string) => void
    pageStatus: StatusType
}

export const AddPackBlock: React.FC<AddPackBlockPropsType> = React.memo(({createPack, pageStatus
                                                                         }) => {
    const [showCreatePackModal, setShowCreatePackModal] = useState(false)

    return <>
        <TableButton btnName={"+"} btnType={"green"} onClick={() => setShowCreatePackModal(true)}
                     disabled={pageStatus === "loading"}/>
        <OneInputModal title={"Create pack"}
                       placeholder={"please type a pack name"}
                       active={showCreatePackModal}
                       setActive={setShowCreatePackModal}
                       handleOnSubmit={createPack}
        />
    </>
})