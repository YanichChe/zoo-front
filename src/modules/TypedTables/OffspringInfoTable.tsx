import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { OffspringInfoService } from '../../services/offspringInfoService/OffspringInfoService';
import { OffspringInfo } from '../../services/offspringInfoService/OffspringInfo.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function OffspringInfoTable() {
    const getService = new OffspringInfoService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (offspringInfoArray: OffspringInfo[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        offspringInfoArray.forEach(offspringInfo => {
            const row: React.ReactNode[] = [];
            row.push(<p>{offspringInfo.name}</p>);
            row.push(<p>{offspringInfo.animalTitle}</p>);
            row.push(<p>{offspringInfo.age}</p>);
            row.push(<p>{offspringInfo.ageStart}</p>);
            row.push(<p>{offspringInfo.ageEnd}</p>);
            row.push(<p>{offspringInfo.state}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns([
            'Name',
            'Animal Title',
            'Age',
            'Start Age',
            'End Age',
            'State'
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
