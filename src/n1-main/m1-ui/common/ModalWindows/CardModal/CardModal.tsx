import React from "react";
import classes from "./CardModal.module.scss";
import {Modal} from "../Modal";
import {Button} from "../../Button/Button";

type CardModalPropsType = {
    question: string
    answer: string
    active: boolean
    setActive: (value: boolean) => void
}

export const CardModal: React.FC<CardModalPropsType> = ({question, answer, active, setActive}) => {
    return <>
        <Modal active={active} setActive={setActive}>
            {/*<div className={classes.sideQ}>*/}
            {/*    <div className={classes.buttons}>*/}
            {/*        <Button*/}
            {/*            btnName={"X"}*/}
            {/*            onClick={() => setActive(false)}*/}
            {/*            style={{*/}
            {/*                position: "absolute",*/}
            {/*                width: "30px",*/}
            {/*                height: "30px",*/}
            {/*                padding: "5px 5px",*/}
            {/*                left: "10px",*/}
            {/*                top: "10px"*/}
            {/*            }}*/}
            {/*        />*/}
            {/*        <Button*/}
            {/*            btnName={"=>"}*/}
            {/*            onClick={() => alert("next card")}*/}
            {/*            style={{*/}
            {/*                position: "absolute",*/}
            {/*                width: "30px",*/}
            {/*                height: "30px",*/}
            {/*                padding: "5px 5px",*/}
            {/*                right: "10px",*/}
            {/*                top: "10px"*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    {question}*/}
            {/*</div>*/}
            <div className={classes.sideA}>
                <div className={classes.buttons}>
                    <Button
                        btnName={"X"}
                        onClick={() => setActive(false)}
                        style={{position: "absolute",
                            width: "30px",
                            height: "30px",
                            padding: "5px 5px",
                            left: "10px",
                            top: "10px"
                        }}
                    />
                    <Button
                        btnName={"=>"}
                        onClick={() => alert("next card")}
                        style={{position: "absolute",
                            width: "30px",
                            height: "30px",
                            padding: "5px 5px",
                            right: "10px",
                            top: "10px"
                        }}
                    />
                </div>
                {answer}
                <div className={classes.gradeButtons}>
                    <Button btnName={"1"}/>
                    <Button btnName={"2"}/>
                    <Button btnName={"3"}/>
                    <Button btnName={"4"}/>
                    <Button btnName={"5"}/>
                </div>
            </div>
        </Modal>
    </>
}