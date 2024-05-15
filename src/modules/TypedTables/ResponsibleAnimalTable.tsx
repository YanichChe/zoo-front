import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { ResponseAnimal } from '../../services/responsibleAnimalService/ResponsibleAnimal.types';
import { ResponseAnimalService } from '../../services/responsibleAnimalService/ResponsibleAnimalService';

export default function ResponseAnimalTable() {
    const getService = new ResponseAnimalService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (responseAnimalArray: ResponseAnimal[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        responseAnimalArray.forEach(responseAnimal => {
            const row: React.ReactNode[] = [];
            row.push(<p>{responseAnimal.staff}</p>);
            row.push(<p>{responseAnimal.individual}</p>);
            row.push(<p>{responseAnimal.dateStart}</p>);
            row.push(<p>{responseAnimal.dateEnd}</p>);
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
