import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { OffspringFactorService } from '../../services/offspringFactorService/OffspringFactorService';
import { OffspringFactor } from '../../services/offspringFactorService/OffspringFactor.types';

export default function OffspringFactorTable() {
    const getService = new OffspringFactorService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (offspringFactorArray: OffspringFactor[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        offspringFactorArray.forEach(offspringFactor => {
            const row: React.ReactNode[] = [];
            row.push(<p>{offspringFactor.animal}</p>);
            row.push(<p>{offspringFactor.physicalState}</p>);
            row.push(<p>{offspringFactor.ageStart}</p>);
            row.push(<p>{offspringFactor.ageEnd}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Животное', 'Физическое состояние', 'Начальный возраст', 'Конечный возраст'].map((value: string) => ({ label: <p>{value}</p> })));
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
