import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { ClimateZoneService } from '../../services/climateZoneService/ClimateZoneService';
import { ClimateZone } from '../../services/climateZoneService/ClimateZone.types';

export default function ClimateZoneTable() {
    const getService = new ClimateZoneService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (climateZoneArray: ClimateZone[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        climateZoneArray.forEach(climateZone => {
            const row: React.ReactNode[] = [];
            row.push(<p>{climateZone.isColdTolerance ? 'Да' : 'Нет'}</p>);
            row.push(<p>{climateZone.climateZoneName}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Холодоустойчивость', 'Название климатической зоны'].map((value: string) => ({ label: <p>{value}</p> })));
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
