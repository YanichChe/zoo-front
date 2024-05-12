import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { NutritionTypeService } from '../../services/nutrtitionTypeService/NutritionTypeService';
import { NutritionType } from '../../services/nutrtitionTypeService/NutrititionType.types';

export default function NutritionTypeTable() {
    const getService = new NutritionTypeService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (nutritionTypeArray: NutritionType[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        nutritionTypeArray.forEach(nutritionType => {
            const row: React.ReactNode[] = [];
            row.push(<p>{nutritionType.type}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Тип питания'].map((value: string) => ({ label: <p>{value}</p> })));
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
