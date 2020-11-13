import React, {useState} from "react";
import classes from "./SortOutOwnPacks.module.scss";

type SortOutOwnPacksPropsType = {}

export const SortOutOwnPacks: React.FC<SortOutOwnPacksPropsType> = ({}) => {
    const [justMy, setJustMy] = useState(false)

    return <div>
        <input
            className={classes.checkbox}
            type={"checkbox"} id={"customCheckbox"} name={"customCheckbox"} checked={justMy}/>
        <label htmlFor={"customCheckbox"} onClick={() => setJustMy(!justMy)}>
            <h4>view just own packs</h4>
        </label>
    </div>
}
