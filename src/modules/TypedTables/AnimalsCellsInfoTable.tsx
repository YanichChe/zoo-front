import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column } from '../../components/table/Table';
import { AnimalsCellsInfoService } from '../../services/animalCellInfoService/AnimalsCellsInfoService';
import { AnimalsCellsInfo } from '../../services/animalCellInfoService/AnimalsCellsInfo.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function AnimalsCellsInfoTable() {
    const getService = new AnimalsCellsInfoService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (animalsCellsInfoArray: AnimalsCellsInfo[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        animalsCellsInfoArray.forEach(animalsCellsInfo => {
            const row: React.ReactNode[] = [];
            row.push(<p>{animalsCellsInfo.individualName}</p>);
            row.push(<p>{animalsCellsInfo.animalTitle}</p>);
            row.push(<p>{animalsCellsInfo.cellNumber}</p>);
            row.push(<p>{animalsCellsInfo.cellDateStart}</p>);
            row.push(<p>{animalsCellsInfo.cellDateEnd}</p>);
            row.push(<p>{animalsCellsInfo.gender}</p>);
            row.push(<p>{animalsCellsInfo.age}</p>);
            row.push(<p>{animalsCellsInfo.weight}</p>);
            row.push(<p>{animalsCellsInfo.height}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns([
            'Individual Name', 
            'Animal Title', 
            'Cell Number', 
            'Cell Date Start', 
            'Cell Date End', 
            'Gender', 
            'Age', 
            'Weight', 
            'Height'
        ].map((value: string) => ({ label: <p>{value}</p> })));
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
