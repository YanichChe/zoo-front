import React, { useEffect, useState } from 'react';

import { FamilyRelationship } from '../../services/familyRelationshipService/FamilyRelationship.types';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { FamilyRelationshipService } from '../../services/familyRelationshipService/FamilyRelationshipService';

export default function FamilyRelationshipTable() {
    const getService = new FamilyRelationshipService(HTTPClient.getInstance());
    const [c, setC] = useState<Column[]>();
    const [d, setD] = useState<React.ReactNode[][]>();

    const unpackData = (familyRelationshipArray: FamilyRelationship[]): React.ReactNode[][] => {
        const data: React.ReactNode[][] = [];

        familyRelationshipArray.forEach(familyRelationship => {
            const row: React.ReactNode[] = [];
            row.push(<p>{familyRelationship.individual1}</p>);
            row.push(<p>{familyRelationship.individual2}</p>);
            row.push(<p>{familyRelationship.typeRelationship}</p>);
            data.push(row);
        });

        return data;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setC(['Индивидуальный 1', 'Индивидуальный 2', 'Тип отношений'].map((value: string) => ({ label: <p>{value}</p> })));
        setD(unpackData(objects));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    return (
        <>
            {c !== undefined && d !== undefined && (
                <Table
                    columns={c}
                    data={d}
                />
            )}
        </>
    );
}
