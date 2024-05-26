import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { ResponsibleStaffService } from '../../services/responsibleStaffService/ResponsibleStaffService';
import { ResponsibleStaff } from '../../services/responsibleStaffService/ResponsibleStaff.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function ResponsibleStaffTable() {
    const getService = new ResponsibleStaffService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (responsibleStaffArray: ResponsibleStaff[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        responsibleStaffArray.forEach(responsibleStaff => {
            const row: React.ReactNode[] = [];
            row.push(<p>{responsibleStaff.staffId}</p>);
            row.push(<p>{responsibleStaff.staffName}</p>);
            row.push(<p>{responsibleStaff.staffSurname}</p>);
            row.push(<p>{responsibleStaff.middleName}</p>);
            row.push(<p>{responsibleStaff.individualId}</p>);
            row.push(<p>{responsibleStaff.individualName}</p>);
            row.push(<p>{responsibleStaff.animalId}</p>);
            row.push(<p>{responsibleStaff.dateStart}</p>);
            row.push(<p>{responsibleStaff.dateEnd}</p>);
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
            'Animal ID', 
            'Date Start', 
            'Date End'
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
