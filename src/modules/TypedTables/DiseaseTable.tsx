import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { DiseaseService } from '../../services/diseaseService/DiseaseService';
import { Disease } from '../../services/diseaseService/Disease.types';

export default function DiseaseTable() {
    const getService = new DiseaseService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (diseaseArray: Disease[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        diseaseArray.forEach(disease => {
            const row: React.ReactNode[] = [];
            row.push(<p>{disease.diseaseName}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Название болезни'].map((value: string) => ({ label: <p>{value}</p> })));
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
