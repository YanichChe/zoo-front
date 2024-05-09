import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { IndividualReceiptStatusService } from '../../services/individualReceiptStatusService/IndividualReceiptStatusService';
import { IndividualReceiptStatus } from '../../services/individualReceiptStatusService/IndividualReceiptStatus.types';

export default function IndividualReceiptStatusTable() {
    const getService = new IndividualReceiptStatusService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (individualReceiptStatusArray: IndividualReceiptStatus[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        individualReceiptStatusArray.forEach(individualReceiptStatus => {
            const row: React.ReactNode[] = [];
            row.push(<p>{individualReceiptStatus.statusName}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Статус'].map((value: string) => ({ label: <p>{value}</p> })));
        setData(unpackData(objects));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    return (
        <>
            {columns && data && (
                <Table
                    columns={columns}
                    data={data}
                />
            )}
        </>
    );
}
