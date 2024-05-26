import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { FullDiseaseInfoService } from '../../services/fullDiseaseInfoService/FullDiseaseInfoService';
import { FullDiseaseInfo } from '../../services/fullDiseaseInfoService/FullDiseaseInfo.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function FullDiseaseInfoTable() {
    const getService = new FullDiseaseInfoService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (fullDiseaseInfoArray: FullDiseaseInfo[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        fullDiseaseInfoArray.forEach(fullDiseaseInfo => {
            const row: React.ReactNode[] = [];
            row.push(<p>{fullDiseaseInfo.name}</p>);
            row.push(<p>{fullDiseaseInfo.animalTitle}</p>);
            row.push(<p>{fullDiseaseInfo.height}</p>);
            row.push(<p>{fullDiseaseInfo.weight}</p>);
            row.push(<p>{fullDiseaseInfo.diseaseName}</p>);
            row.push(<p>{fullDiseaseInfo.birthday}</p>);
            row.push(<p>{fullDiseaseInfo.dateAppearance}</p>);
            row.push(<p>{fullDiseaseInfo.dateDisappearance}</p>);
            row.push(<p>{fullDiseaseInfo.age}</p>);
            row.push(<p>{fullDiseaseInfo.cellNumber}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns([
            'Name', 
            'Animal Title', 
            'Height', 
            'Weight', 
            'Disease Name', 
            'Birthday', 
            'Date Appearance', 
            'Date Disappearance', 
            'Age', 
            'Cell Number'
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
