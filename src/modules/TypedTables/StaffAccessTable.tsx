import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { StaffAccessService } from '../../services/staffAccessService/StaffAccessService';
import { StaffAccess } from '../../services/staffAccessService/StaffAccess.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function StaffAccessTable() {
    const getService = new StaffAccessService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (staffAccessArray: StaffAccess[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        staffAccessArray.forEach(staffAccess => {
            const row: React.ReactNode[] = [];
            row.push(<p>{staffAccess.staffId}</p>);
            row.push(<p>{staffAccess.staffName}</p>);
            row.push(<p>{staffAccess.staffSurname}</p>);
            row.push(<p>{staffAccess.middleName}</p>);
            row.push(<p>{staffAccess.individualId}</p>);
            row.push(<p>{staffAccess.individualName}</p>);
            row.push(<p>{staffAccess.animalId}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns([
            'Staff ID', 
            'Staff Name', 
            'Staff Surname', 
            'Middle Name', 
            'Individual ID', 
            'Individual Name', 
            'Animal ID'
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
