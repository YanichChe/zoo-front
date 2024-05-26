import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { ProviderHistoryZooService } from '../../services/providerHistoryZoo/ProviderHistoryZooService';
import { ProviderHistoryZoo } from '../../services/providerHistoryZoo/ProviderHistoryZoo.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function ProviderHistoryZooTable() {
    const getService = new ProviderHistoryZooService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (providerHistoryZooArray: ProviderHistoryZoo[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        providerHistoryZooArray.forEach(providerHistoryZoo => {
            const row: React.ReactNode[] = [];
            row.push(<p>{providerHistoryZoo.date}</p>);
            row.push(<p>{providerHistoryZoo.provider}</p>);
            row.push(<p>{providerHistoryZoo.foodName}</p>);
            row.push(<p>{providerHistoryZoo.feedType}</p>);
            row.push(<p>{providerHistoryZoo.number}</p>);
            row.push(<p>{providerHistoryZoo.dimension}</p>);
            row.push(<p>{providerHistoryZoo.price}</p>);
            row.push(<p>{providerHistoryZoo.selfSufficiency ? 'Yes' : 'No'}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Date', 'Provider', 'Food Name', 'Feed Type', 'Number', 'Dimension', 'Price', 'Self-Sufficiency'].map((value: string) => ({ label: <p>{value}</p> })));
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
