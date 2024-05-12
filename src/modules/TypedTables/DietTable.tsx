import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { DietService } from '../../services/dietService/DietService';
import { Diet } from '../../services/dietService/Diet.types';

export default function DietTable() {
    const getService = new DietService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (dietArray: Diet[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        dietArray.forEach(diet => {
            const row: React.ReactNode[] = [];
            row.push(<p>{diet.count}</p>);
            row.push(<p>{diet.time}</p>);
            row.push(<p>{diet.dietCharacteristics}</p>);
            row.push(<p>{diet.food}</p>);
            row.push(<p>{diet.dimension}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Количество', 'Время', 'Характеристики диеты', 'Еда', 'Размерность'].map((value: string) => ({ label: <p>{value}</p> })));
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
