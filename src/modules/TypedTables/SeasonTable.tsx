import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { SeasonService } from '../../services/seasonService/SeasonService';
import { Season } from '../../services/seasonService/Season.types';

export default function SeasonTable() {
    const getService = new SeasonService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (seasonArray: Season[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        seasonArray.forEach(season => {
            const row: React.ReactNode[] = [];
            row.push(<p>{season.season}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Сезон'].map((value: string) => ({ label: <p>{value}</p> })));
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
