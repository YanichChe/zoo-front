import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { ProviderHistoryService } from '../../services/providerHistoryService/ProviderHistoryService';
import { ProviderHistory } from '../../services/providerHistoryService/ProviderHistory.types';

export default function ProviderHistoryTable() {
    const getService = new ProviderHistoryService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (providerHistoryArray: ProviderHistory[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        providerHistoryArray.forEach(providerHistory => {
            const row: React.ReactNode[] = [];
            row.push(<p>{providerHistory.date}</p>);
            row.push(<p>{providerHistory.number}</p>);
            row.push(<p>{providerHistory.price}</p>);
            row.push(<p>{providerHistory.food}</p>);
            row.push(<p>{providerHistory.provider}</p>);
            row.push(<p>{providerHistory.dimension}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Дата', 'Количество', 'Цена', 'Еда', 'Поставщик', 'Измерение'].map((value: string) => ({ label: <p>{value}</p> })));
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
