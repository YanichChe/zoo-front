import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { TypeRelationshipService } from '../../services/typeRelationshipService/TypeRelatitionshipService';
import { TypeRelationship } from '../../services/typeRelationshipService/TypeRelationship.types';

export default function TypeRelationshipTable() {
    const getService = new TypeRelationshipService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (typeRelationshipArray: TypeRelationship[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        typeRelationshipArray.forEach(typeRelationship => {
            const row: React.ReactNode[] = [];
            row.push(<p>{typeRelationship.relationship}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Вид отношений'].map((value: string) => ({ label: <p>{value}</p> })));
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
