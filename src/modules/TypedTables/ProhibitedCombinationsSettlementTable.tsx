import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { ProhibitedCombinationsSettlementService } from '../../services/prohibitedCombinationsSettlement/ProhibitedService';
import { ProhibitedCombinationsSettlement } from '../../services/prohibitedCombinationsSettlement/Prohibited.types';

export default function ProhibitedCombinationsSettlementTable() {
    const getService = new ProhibitedCombinationsSettlementService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (prohibitedCombinationsSettlementArray: ProhibitedCombinationsSettlement[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        prohibitedCombinationsSettlementArray.forEach(prohibitedCombinationsSettlement => {
            const row: React.ReactNode[] = [];
            row.push(<p>{prohibitedCombinationsSettlement.animalId1}</p>);
            row.push(<p>{prohibitedCombinationsSettlement.animalId2}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Тип животного 1', 'Тип животного 2'].map((value: string) => ({ label: <p>{value}</p> })));
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
