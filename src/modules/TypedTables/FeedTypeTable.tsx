import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { FeedTypeService } from '../../services/feedTypeService/FeedTypeService';
import { FeedType } from '../../services/feedTypeService/FeedType.types';

export default function FeedTypeTable() {
    const getService = new FeedTypeService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (feedTypeArray: FeedType[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        feedTypeArray.forEach(feedType => {
            const row: React.ReactNode[] = [];
            row.push(<p>{feedType.type}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Тип корма'].map((value: string) => ({ label: <p>{value}</p> })));
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
