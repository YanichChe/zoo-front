import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { NeedWarmRoomService } from '../../services/needWarmRoomService/NeedWarmRoomService';
import { NeedWarmRoom } from '../../services/needWarmRoomService/NeedWarmRoom.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function NeedWarmRoomTable() {
    const getService = new NeedWarmRoomService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (needWarmRoomArray: NeedWarmRoom[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        needWarmRoomArray.forEach(needWarmRoom => {
            const row: React.ReactNode[] = [];
            row.push(<p>{needWarmRoom.individualName}</p>);
            row.push(<p>{needWarmRoom.animalTitle}</p>);
            row.push(<p>{needWarmRoom.age}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns([
            'Individual Name',
            'Animal Title',
            'Age'
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
