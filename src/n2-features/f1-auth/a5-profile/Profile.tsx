import React from 'react';
import classes from "./Profile.module.css";
import { UserDataType } from '../../../n1-main/m3-dal/auth-api';
import NavItem from '../../../n1-main/m1-ui/common/NavItem/NavItem';


type PropsType = {
    userData: UserDataType
}

const Profile: React.FC<PropsType> = ({userData}) => {

    return (
        <div className={classes.profile}>
            <div className={classes.profile__container}>
                <div className={classes.profile__title}>
                    <h3>Profile page</h3>
                </div>

                <div className={classes.profile__info}>
                    <table>
                        <tbody>
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
                            <th>Added:</th>
                            <td>{userData.created}</td>
                        </tr>
                        <tr>
                            <th>Packs of cards:</th>
                            <td>{userData.publicCardPacksCount}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Profile);
