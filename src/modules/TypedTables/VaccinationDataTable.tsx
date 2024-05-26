// VaccinationDataTable.tsx

import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { VaccinationDataService } from '../../services/vaccinationDataService/VaccinationDataService';
import { VaccinationData } from '../../services/vaccinationDataService/VaccinationData.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function VaccinationDataTable() {
    const getService = new VaccinationDataService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (vaccinationArray: VaccinationData[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        vaccinationArray.forEach(vaccination => {
            const row: React.ReactNode[] = [];
            row.push(<p>{vaccination.individualName}</p>);
            row.push(<p>{vaccination.animalTitle}</p>);
            row.push(<p>{vaccination.gender}</p>);
            row.push(<p>{vaccination.age}</p>);
            row.push(<p>{vaccination.vaccinationId}</p>);
            row.push(<p>{vaccination.vaccinationName}</p>);
            row.push(<p>{vaccination.dateAppearance}</p>);
            row.push(<p>{vaccination.dateDisappearance}</p>);
            row.push(<p>{vaccination.childrenCount}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Individual Name', 'Animal Title', 'Gender', 'Age', 'Vaccination ID', 'Vaccination Name', 'Date Appearance', 'Date Disappearance', 'Children Count'].map((value: string) => ({ label: <p>{value}</p> })));
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
