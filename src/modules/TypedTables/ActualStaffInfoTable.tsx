import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { ActualStaffInfoService } from '../../services/actualStaffInfoService/ActualStaffInfoService';
import { ActualStaffInfo } from '../../services/actualStaffInfoService/ActualStaffInfo.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function ActualStaffInfoTable() {
    const getService = new ActualStaffInfoService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (actualStaffInfoArray: ActualStaffInfo[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        actualStaffInfoArray.forEach(actualStaffInfo => {
            const row: React.ReactNode[] = [];
            row.push(<p>{actualStaffInfo.name}</p>);
            row.push(<p>{actualStaffInfo.surname}</p>);
            row.push(<p>{actualStaffInfo.middleName}</p>);
            row.push(<p>{actualStaffInfo.age}</p>);
            row.push(<p>{actualStaffInfo.gender}</p>);
            row.push(<p>{actualStaffInfo.dateStart}</p>);
            row.push(<p>{actualStaffInfo.longWork}</p>);
            row.push(<p>{actualStaffInfo.dateEnd}</p>);
            row.push(<p>{actualStaffInfo.type}</p>);
            row.push(<p>{actualStaffInfo.salary}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns([
            'Name', 
            'Surname', 
            'Middle Name', 
            'Age', 
            'Gender', 
            'Date Start', 
            'Long Work', 
            'Date End', 
            'Type', 
            'Salary'
        ].map((value: string) => ({ label: <p>{value}</p> })));
        setData(unpackData(objects));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    return (
        <>
            {columns && data && (
                <TableSimple
                    columns={columns}
                    data={data}
                />
            )}
        </>
    );
}
