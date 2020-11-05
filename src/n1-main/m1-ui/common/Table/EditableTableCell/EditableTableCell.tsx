import classes from './EditableTableCell.module.scss';
import React, {ChangeEvent, useState} from 'react';
import {TableButton} from '../TableButton/TableButton';


type PropsType = {
    text: string
    changeText: (text: string) => void
}

const EditableTableCell: React.FC<PropsType> = React.memo(({text, changeText}) => {

    const [edit, setEdit] = useState(false)
    const [editableText, setEditableText] = useState(text)

    const changeTextHandler = () => {
        setEdit(false)
        if (text !== editableText) {
            changeText(editableText)
        }
    }

    const enableEditMode = () => setEdit(true)
    const changeEditableText = (e: ChangeEvent<HTMLInputElement>) => setEditableText(e.target.value)

    return (
        <div className={classes.editable_cell}>
            {edit
                ? <input className={classes.editable_cell__input}
                         type="text"
                         onChange={changeEditableText}
                         autoFocus
                         value={editableText}
                />
                : <div onDoubleClick={enableEditMode}>{editableText}</div>
            }
            {edit
                ? <TableButton btnName={"save"} onClick={changeTextHandler}/>
                : <TableButton btnName={"edit"} onClick={enableEditMode}/>
            }

        </div>
    );
})

export default EditableTableCell;
