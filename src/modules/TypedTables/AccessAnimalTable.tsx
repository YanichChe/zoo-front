import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { AccessAnimalService } from '../../services/accessAnimalService/AccessAnimalService';
import { AccessAnimal } from '../../services/accessAnimalService/AccessAnimal.types';

export default function AccessAnimalTable() {
    const getService = new AccessAnimalService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (accessAnimalArray: AccessAnimal[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        accessAnimalArray.forEach(accessAnimal => {
            const row: React.ReactNode[] = [];
            row.push(<p>{accessAnimal.staff}</p>);
            row.push(<p>{accessAnimal.individual}</p>);
            row.push(<p>{accessAnimal.dateStart}</p>);
            row.push(<p>{accessAnimal.dateEnd}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Сотрудник', 'Особь', 'Дата начала', 'Дата конца'].map((value: string) => ({ label: <p>{value}</p> })));
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
