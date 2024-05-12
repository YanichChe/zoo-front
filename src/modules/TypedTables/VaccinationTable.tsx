import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { VaccinationService } from '../../services/vaccinationService/VaccinationService';
import { Vaccination } from '../../services/vaccinationService/Vaccination.types';

export default function VaccinationTable() {
    const getService = new VaccinationService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (vaccinationArray: Vaccination[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        vaccinationArray.forEach(vaccination => {
            const row: React.ReactNode[] = [];
            row.push(<p>{vaccination.vaccinationName}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Название вакцинации'].map((value: string) => ({ label: <p>{value}</p> })));
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
