import React from 'react';
import classes from "./Table.module.scss";

export interface ITableModel {
    title: (index: number) => JSX.Element;
    render: (dataItem: any, modelIndex: number, dataIndex: number) => JSX.Element;
}

interface ITableProps {
    model: ITableModel[];
    data: any;
    disabled: boolean
}

const Table: React.FC<ITableProps> = React.memo(({model, data, disabled}) => {

    // console.log("table")

    return (
        <table className={`${classes.table} ${disabled ? classes.table__loading : ""}`}>
            <thead>
            <tr className={classes.table__row_header}>
                {model.map((m: ITableModel, index: number) => m.title(index))}
            </tr>
            </thead>
            <tbody>
            {data.map((dataItem: any, dataIndex: number) => (
                <tr className={classes.table__row_data} key={dataItem._id}>
                    {model.map((m, modelIndex) => m.render(dataItem, modelIndex, dataIndex))}
                </tr>
            ))}
            </tbody>
        </table>
    );
})
// just a init commit
export default Table;
