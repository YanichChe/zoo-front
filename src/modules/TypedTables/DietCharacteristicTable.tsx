import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { DietCharacteristicService } from '../../services/dietCharacteristicService/DietCharacteristicService';
import { DietCharacteristic } from '../../services/dietCharacteristicService/DietCharacteristic.types';

export default function DietCharacteristicTable() {
    const getService = new DietCharacteristicService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (dietCharacteristicArray: DietCharacteristic[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        dietCharacteristicArray.forEach(dietCharacteristic => {
            const row: React.ReactNode[] = [];
            row.push(<p>{dietCharacteristic.age}</p>);
            row.push(<p>{dietCharacteristic.physicalState}</p>);
            row.push(<p>{dietCharacteristic.season}</p>);
            row.push(<p>{dietCharacteristic.animal}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Возраст', 'Физическое состояние', 'Сезон', 'Животное'].map((value: string) => ({ label: <p>{value}</p> })));
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
