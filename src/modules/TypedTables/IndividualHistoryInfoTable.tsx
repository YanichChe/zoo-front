import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { IndividualHistoryInfoService } from '../../services/IndividualHistoryInfoService/IndividualHistoryInfoService';
import { IndividualHistoryInfo } from '../../services/IndividualHistoryInfoService/IndividualHistoryInfo.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function IndividualHistoryInfoTable() {
    const getService = new IndividualHistoryInfoService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (individualHistoryInfoArray: IndividualHistoryInfo[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        individualHistoryInfoArray.forEach(individualHistoryInfo => {
            const row: React.ReactNode[] = [];
            row.push(<p>{individualHistoryInfo.receiptDate}</p>);
            row.push(<p>{individualHistoryInfo.zooName}</p>);
            row.push(<p>{individualHistoryInfo.statusName}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns([
            'Receipt Date', 
            'Zoo Name', 
            'Status Name'
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
