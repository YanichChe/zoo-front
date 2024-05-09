import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { IndividualHistoryService } from '../../services/individualHistoryService/IndividualHistoryService';
import { IndividualHistory } from '../../services/individualHistoryService/IndividualHistory.types';

export default function IndividualHistoryTable() {
    const getService = new IndividualHistoryService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (individualHistoryArray: IndividualHistory[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        individualHistoryArray.forEach(individualHistory => {
            const row: React.ReactNode[] = [];
            row.push(<p>{individualHistory.receiptDate}</p>);
            row.push(<p>{individualHistory.individual}</p>);
            row.push(<p>{individualHistory.individualStatus}</p>);
            row.push(<p>{individualHistory.zoo}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Дата поступления', 'Индивидуальный объект', 'Статус индивидуального объекта', 'Зоопарк'].map((value: string) => ({ label: <p>{value}</p> })));
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
