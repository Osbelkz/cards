import React from "react";
import classes from "./ThreeInputModal.module.scss";
import {Modal} from "../Modal";
import {Button} from "../../Button/Button";
import {useFormik} from "formik";

type InputModalType = {
    title: string
    firstInputValue?: string
    secondInputValue?: string
    thirdInputValue?: string
    active: boolean
    setActive: (value: boolean) => void
    handleOnSubmit: (question: string, answer: string, comment: string) => void
}

export const ThreeInputModal: React.FC<InputModalType> = ({title, firstInputValue,
                                                              secondInputValue, thirdInputValue,
                                                              active, setActive, handleOnSubmit}) => {
    const formik = useFormik({
        initialValues: {
            firstInput: firstInputValue ? firstInputValue : "",
            secondInput: secondInputValue ? secondInputValue : "",
            thirdInput: thirdInputValue ? thirdInputValue : ""
        },
        onSubmit: values => {
            handleOnSubmit(values.firstInput, values.secondInput, values.thirdInput)
            setActive(false)
        }
    })

    return <Modal active={active} setActive={setActive}>
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
            <form onSubmit={formik.handleSubmit} className={classes.inputModal}>
                <h3>{title}</h3>
                <textarea placeholder={"question"} {...formik.getFieldProps("question")} value={firstInputValue ? firstInputValue : ""}>
                    Question
                </textarea>
                <textarea  placeholder={"answer"} {...formik.getFieldProps("answer")} value={secondInputValue ? secondInputValue : ""}>
                    Answer
                </textarea>
                <textarea  placeholder={"comment"} {...formik.getFieldProps("comment")} value={thirdInputValue ? thirdInputValue : ""}>
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
}