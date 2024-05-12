import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { FoodProviderService } from '../../services/foodProviderService/FoodProviderService';
import { FoodProvider } from '../../services/foodProviderService/FoodProvider.types';

export default function FoodProviderTable() {
    const getService = new FoodProviderService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (foodProviderArray: FoodProvider[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        foodProviderArray.forEach(foodProvider => {
            const row: React.ReactNode[] = [];
            row.push(<p>{foodProvider.provider}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Поставщик'].map((value: string) => ({ label: <p>{value}</p> })));
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
