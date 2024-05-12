import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { DimensionService } from '../../services/dimensionService/DimensionService';
import { Dimension } from '../../services/dimensionService/Dimension.types';

export default function DimensionTable() {
    const getService = new DimensionService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (dimensionArray: Dimension[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        dimensionArray.forEach(dimension => {
            const row: React.ReactNode[] = [];
            row.push(<p>{dimension.dimension}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Размерность'].map((value: string) => ({ label: <p>{value}</p> })));
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
