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
            <div className={classes.profile__container}>
                <h3>Profile page</h3>
                <div className={classes.profile__info}>
                    <table>
                        <tr>
                            <th>Id:</th>
                            <td>{userData._id}</td>
                        </tr>
                        <tr>
                          <th>Username:</th>
                          <td>{userData.name}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{userData.email}</td>
                        </tr>
                        <tr>
                            <th>Added: </th>
                            <td>{userData.created}</td>
                        </tr>
                        <tr>
                            <th>Packs of cards:</th>
                            <td>{userData.publicCardPacksCount}</td>
                        </tr>
                    </table>
                </div>
                <div className={classes.profile__buttons}>
                    <Button btnName={"Logout"} btnType={"red"}/>
                </div>
            </div>
        </div>
    );
};

export default Profile;
