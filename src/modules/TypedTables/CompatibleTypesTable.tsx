import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { CompatibleTypesService } from '../../services/compatibleService/CompatibleTypesService';
import { CompatibleTypes } from '../../services/compatibleService/CompatibleTypes.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function CompatibleTypesTable() {
    const getService = new CompatibleTypesService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (compatibleTypesArray: CompatibleTypes[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        compatibleTypesArray.forEach(compatibleType => {
            const row: React.ReactNode[] = [];
            row.push(<p>{compatibleType.aanimalTitle}</p>);
            row.push(<p>{compatibleType.banimalTitle}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns([
            'A Animal Title', 
            'B Animal Title'
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
