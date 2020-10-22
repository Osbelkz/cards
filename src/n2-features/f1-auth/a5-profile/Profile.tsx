import React from 'react';
import classes from "./Profile.module.css";
import {Button} from "../../../n1-main/m1-ui/common/Button/Button";
import {UserDataType} from "../../../n1-main/m3-dal/profile-api";

type PropsType = {
    userData: UserDataType | null
}

const Profile: React.FC<PropsType> = ({userData}) => {

    if (!userData) {
        return <div></div>
    }

    return (
        <div className={classes.profile}>
            <div>
                <div>{userData.name}</div>
                <div>{userData.email}</div>
                <div>{userData.publicCardPacksCount}</div>

                <Button btnName={"Logout"} btnType={"red"}/>

            </div>
        </div>
    );
};

export default Profile;
