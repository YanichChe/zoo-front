import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { FoodService } from '../../services/foodService/FoodService';
import { Food } from '../../services/foodService/Food.types';

export default function FoodTable() {
    const getService = new FoodService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (foodArray: Food[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        foodArray.forEach(food => {
            const row: React.ReactNode[] = [];
            row.push(<p>{food.foodName}</p>);
            row.push(<p>{food.feedType}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Название продукта', 'Тип корма'].map((value: string) => ({ label: <p>{value}</p> })));
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
