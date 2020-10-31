import classes from './EditableTableCell.module.scss';
import React, {useState} from 'react';
import {TableButton} from '../TableButton/TableButton';


type PropsType = {
    text: string
    changeText: (text: string) => void
}

const EditableTableCell: React.FC<PropsType> = ({text, changeText}) => {

    const [edit, setEdit] = useState(false)
    const [editableText, setEditableText] = useState(text)

    const changeTextHandler = () => {
        setEdit(false)
        if (text !== editableText) {
            changeText(editableText)
        }
    }


    return (
        <div className={classes.editable_cell}>
            {edit
                ? <input className={classes.editable_cell__input}
                         type="text"
                         onChange={(e) => setEditableText(e.target.value)}
                         autoFocus
                         value={editableText}
                />
                : <div onDoubleClick={() => setEdit(true)}>{editableText}</div>
            }
            {edit
                ? <TableButton btnName={"save"} onClick={changeTextHandler}/>
                : <TableButton btnName={"edit"} onClick={()=>setEdit(true)}/>
            }

        </div>
    );
};

export default EditableTableCell;
