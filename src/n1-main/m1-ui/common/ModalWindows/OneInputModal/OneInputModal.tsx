import React from "react";
import classes from "./OneInputModal.module.scss";
import {Modal} from "../Modal";
import {Button} from "../../Button/Button";
import {useFormik} from "formik";
import {TableButton} from "../../Table/TableButton/TableButton";

type InputModalType = {
    value?: string
    placeholder: string
    title: string
    active: boolean
    setActive: (value: boolean) => void
    handleOnSubmit: (itemName: string) => void
}

export const OneInputModal: React.FC<InputModalType> = ({title, placeholder, value, active, setActive, handleOnSubmit}) => {

    const formik = useFormik({
        initialValues: {
            itemsName: value || "",
        },
        onSubmit: values => {
            handleOnSubmit(values.itemsName)
            setActive(false)
        }
    })

    return <Modal active={active} setActive={setActive}>
            <div className={classes.closeButton}>
                <TableButton
                    btnName={"X"}
                    onClick={() => setActive(false)}/>
            </div>
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
                        type={"reset"}
                        btnName={"Reset"}
                        style={{marginLeft: "10px"}}
                        onClick={() => formik.setValues({itemsName: ""})}
                    />
                </div>
            </form>
        </Modal>
}
