import React from "react";
import classes from "./OneInputModal.module.scss";
import {Modal} from "../Modal";
import {Button} from "../../Button/Button";
import {useFormik} from "formik";

type InputModalType = {
    placeholder: string
    title: string
    active: boolean
    setActive: (value: boolean) => void
    handleOnSubmit: (itemName: string) => void
}

export const OneInputModal: React.FC<InputModalType> = ({title, placeholder, active, setActive, handleOnSubmit}) => {
    const formik = useFormik({
        initialValues: {
            itemsName: "",
        },
        onSubmit: values => {
            handleOnSubmit(values.itemsName)
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
                <textarea placeholder={placeholder} {...formik.getFieldProps("itemsName")}/>
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
