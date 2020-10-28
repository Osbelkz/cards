import React, {ReactNode} from 'react';
import classes from "./Table.module.scss";
import {StatusType} from "../../../m2-bll/reducers/app-reducer";


export interface ITableModel {
    title: (index: number) => ReactNode;
    render: (dataItem: any, modelIndex: number, dataIndex: number) => ReactNode;
}

interface ITableProps {
    model: ITableModel[];
    data: any;
    pageStatus: StatusType
}

const Table: React.FC<ITableProps> = ({model, data, pageStatus}) => {

    console.log("table")

    return (
        <div className={`${classes.table} ${pageStatus==="loading" ? classes.table__loading : ""}`}>
            <div className={classes.table__row_header}>
                {model.map((m: ITableModel, index: number) => m.title(index))}
            </div>
                {data.map((dataItem: any, dataIndex: number) => (
                    <div className={classes.table__row_data} key={dataItem._id}>
                        {model.map((m, modelIndex) => m.render(dataItem, modelIndex, dataIndex))}
                    </div>
                ))}
        </div>
    );
};

export default Table;
