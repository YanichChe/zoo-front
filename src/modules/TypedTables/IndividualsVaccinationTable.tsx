import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { IndividualsVaccinationService } from '../../services/individualsVaccinationService/IndividualVaccinationService';
import { IndividualsVaccination } from '../../services/individualsVaccinationService/IndividualVaccination.types';

export default function IndividualsVaccinationTable() {
    const getService = new IndividualsVaccinationService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (individualsVaccinationArray: IndividualsVaccination[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        individualsVaccinationArray.forEach(individualsVaccination => {
            const row: React.ReactNode[] = [];
            row.push(<p>{individualsVaccination.individual}</p>);
            row.push(<p>{individualsVaccination.vaccination}</p>);
            row.push(<p>{individualsVaccination.staff}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Индивидуальный объект', 'Вакцинация', 'Персонал'].map((value: string) => ({ label: <p>{value}</p> })));
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
