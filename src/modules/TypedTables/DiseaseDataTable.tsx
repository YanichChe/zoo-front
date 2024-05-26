import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { DiseaseDataService } from '../../services/diseaseDataService/DiseaseDataService';
import { DiseaseData } from '../../services/diseaseDataService/DiseaseData.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function DiseaseDataTable() {
    const getService = new DiseaseDataService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (diseaseDataArray: DiseaseData[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        diseaseDataArray.forEach(diseaseData => {
            const row: React.ReactNode[] = [];
            row.push(<p>{diseaseData.individualName}</p>);
            row.push(<p>{diseaseData.animalTitle}</p>);
            row.push(<p>{diseaseData.gender}</p>);
            row.push(<p>{diseaseData.age}</p>);
            row.push(<p>{diseaseData.diseaseName}</p>);
            row.push(<p>{diseaseData.dateAppearance}</p>);
            row.push(<p>{diseaseData.dateDisappearance}</p>);
            row.push(<p>{diseaseData.diseaseHistoryDateStart}</p>);
            row.push(<p>{diseaseData.diseaseHistoryDateEnd}</p>);
            row.push(<p>{diseaseData.childrenCount}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns([
            'Individual Name', 
            'Animal Title', 
            'Gender', 
            'Age', 
            'Disease Name', 
            'Date Appearance', 
            'Date Disappearance', 
            'Disease History Date Start', 
            'Disease History Date End', 
            'Children Count'
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
