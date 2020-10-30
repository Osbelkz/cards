import classes from './EditableTableCell.module.scss';
import React, {useState} from 'react';


type PropsType = {
    text: string
    changeText: (text: string) => void
}

const EditableTableCell:React.FC<PropsType> = ({text, changeText}) => {

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
            <button onClick={()=>setEdit(true)}>Change</button>
            {edit
                ? <input className={classes.editable_cell__input}
                    type="text"
                         onChange={(e)=>setEditableText(e.target.value)}
                         onBlur={changeTextHandler}
                         autoFocus
                         value={editableText}
                />
                : <div onDoubleClick={()=>setEdit(true)}>{editableText}</div>
            }

        </div>
    );
};

export default EditableTableCell;