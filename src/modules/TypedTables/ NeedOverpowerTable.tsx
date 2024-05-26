import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column } from '../../components/table/Table';
import { NeedOverpowerService } from '../../services/needOverpowerService/NeedOverpowerService';
import { NeedOverpower } from '../../services/needOverpowerService/NeedOverpower.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function NeedOverpowerTable() {
    const getService = new NeedOverpowerService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (needOverpowerArray: NeedOverpower[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        needOverpowerArray.forEach(needOverpower => {
            const row: React.ReactNode[] = [];
            row.push(<p>{needOverpower.name1}</p>);
            row.push(<p>{needOverpower.animalTitle1}</p>);
            row.push(<p>{needOverpower.name2}</p>);
            row.push(<p>{needOverpower.animalTitle2}</p>);
            row.push(<p>{needOverpower.cellNumber1}</p>);
            row.push(<p>{needOverpower.cellNumber2}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns([
            'Name 1',
            'Animal Title 1',
            'Name 2',
            'Animal Title 2',
            'Cell Number 1',
            'Cell Number 2'
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
