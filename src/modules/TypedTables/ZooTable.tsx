import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { ZooService } from '../../services/zooService/ZooService';
import { Zoo } from '../../services/zooService/Zoo.types';

export default function ZooTable() {
    const getService = new ZooService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (zooArray: Zoo[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        zooArray.forEach(zoo => {
            const row: React.ReactNode[] = [];
            row.push(<p>{zoo.name}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Название зоопарка'].map((value: string) => ({ label: <p>{value}</p> })));
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
