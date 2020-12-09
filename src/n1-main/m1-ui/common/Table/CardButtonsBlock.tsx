import React, {useState} from "react";
import {QuestionModalContainer} from "../ModalWindows/QuestionModal/QuestionModalContainer";
import {ThreeInputModal} from "../ModalWindows/ThreeInputModal/ThreeInputModal";
import {StatusType} from "../../../m2-bll/reducers/app-reducer";
import {CardType} from "../../../m3-dal/cards-api";
import {GeneralBTN} from "./GeneralBTN/GeneralBTN";

type CardButtonsBlockPropsType = {
    deleteCard: (id: string) => void
    updateCard: (cardId: string, question: string, answer: string) => void
    owner: boolean
    pageStatus: StatusType
    card: CardType
}

export const CardButtonsBlock: React.FC<CardButtonsBlockPropsType> = React.memo(({
                                                                                     deleteCard,
                                                                                     updateCard, owner,
                                                                                     pageStatus, card
                                                                                 }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)


    return <>
        <GeneralBTN btnType={"edit"} onClick={() => setShowEditModal(true)}
                 disabled={!owner || pageStatus === "loading"}/>
        <GeneralBTN btnType={"remove"} onClick={() => setShowDeleteModal(true)}
                   disabled={!owner || pageStatus === "loading"}/>
        {owner && <><QuestionModalContainer text={"Delete this card?"}
                                    activate={showDeleteModal}
                                    setActivate={setShowDeleteModal}
                                    setAnswerY={() => deleteCard(card._id)}
                                    setAnswerN={() => {
                                    }}/>
            <ThreeInputModal title={"Edit card"}
                             handleOnSubmit={(question, answer, comment) => updateCard(card._id, question, answer)}
                             setActive={setShowEditModal}
                             firstInputValue={card.question}
                             secondInputValue={card.answer}
                             thirdInputValue={card.comments}
                             active={showEditModal}/>
        </>}
    </>
})
