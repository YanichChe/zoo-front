import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { AnimalTypeFoodService } from '../../services/animalTypeFoodService/AnimalTypeFoodService';
import { AnimalTypeFood } from '../../services/animalTypeFoodService/AnimalTypeFood.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function AnimalTypeFoodTable() {
    const getService = new AnimalTypeFoodService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (animalTypeFoodArray: AnimalTypeFood[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        animalTypeFoodArray.forEach(animalTypeFood => {
            const row: React.ReactNode[] = [];
            row.push(<p>{animalTypeFood.animalTitle}</p>);
            row.push(<p>{animalTypeFood.foodName}</p>);
            row.push(<p>{animalTypeFood.feedType}</p>);
            row.push(<p>{animalTypeFood.age}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Animal Title', 'Food Name', 'Feed Type', 'Age'].map((value: string) => ({ label: <p>{value}</p> })));
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
