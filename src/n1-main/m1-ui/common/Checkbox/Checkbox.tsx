import React, {ChangeEvent} from "react";
import classes from "./Checkbox.module.scss";

type SortOutOwnPacksPropsType = {
    onChange: (checkboxValue: boolean) => void
    title: string
    checked: boolean
    disabled: boolean
}

export const Checkbox: React.FC<SortOutOwnPacksPropsType> = React.memo(({
                                                                                   disabled, onChange,
                                                                            title, checked}) => {
    const setCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked)
    }

    return <div>
        <input
            className={classes.checkbox}
            type={"checkbox"} id={"customCheckbox"} name={"customCheckbox"}
            onChange={setCheckboxHandler}
            disabled={disabled}
            checked={checked}
        />
        <label
            htmlFor={"customCheckbox"}>
            <h4>{title}</h4>
        </label>
    </div>
})
