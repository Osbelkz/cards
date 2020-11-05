import React from "react";
import classes from "./InputModal.module.scss";
import {Modal} from "../Modal";
import {Button} from "../../Button/Button";
import {useFormik} from "formik";

type InputModalType = {
    text: string
    active: boolean
    setActive: (value: boolean) => void
    handleOnSubmit: (question: string, answer: string, comment: string) => void
}

export const InputModal: React.FC<InputModalType> = ({text, active, setActive, handleOnSubmit}) => {
    const formik = useFormik({
        initialValues: {
            question: "",
            answer: "",
            comment: ""
        },
        onSubmit: values => {
            handleOnSubmit(values.question, values.answer, values.comment)
            setActive(false)
        }
    })

    return <div>
        <Modal active={active} setActive={setActive}>
            <form onSubmit={formik.handleSubmit} className={classes.inputModal}>
                <Button
                    btnName={"X"}
                    onClick={() => setActive(false)}
                    style={{position: "absolute",
                        width: "30px",
                        height: "30px",
                        padding: "5px 5px",
                        right: "10px",
                        top: "10px"
                    }}
                />
                <h3>{text}</h3>
                <textarea placeholder={"question"} {...formik.getFieldProps("question")}>
                    Question
                </textarea>
                <textarea  placeholder={"answer"} {...formik.getFieldProps("answer")}>
                    Answer
                </textarea>
                <textarea  placeholder={"comment"} {...formik.getFieldProps("comment")}>
                    Comment
                </textarea>
                <div>
                    <Button
                        btnName={"Save"}
                        btnType={"green"}
                        type={"submit"}
                    />
                    <Button
                        btnName={"Reset"}
                        style={{marginLeft: "10px"}}
                        onClick={() => formik.resetForm()}
                    />
                </div>
            </form>
        </Modal>
    </div>
}