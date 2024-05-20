import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { FamilyRelationships } from '../../services/familyRelationshipService/FamilyRelationship.types';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { FamilyRelationshipsService } from '../../services/familyRelationshipService/FamilyRelationshipService';
import plus from "../../assets/plus.svg"
import { useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { familyRelationshipsStore } from '../../pages/familyRelationship/familyRelationshipsStore';

export default function FamilyRelationshipTable() {
    const getService = new FamilyRelationshipsService(HTTPClient.getInstance());
    const [c, setC] = useState<Column[]>();
    const [d, setD] = useState<React.ReactNode[][]>();
    const [ids, setIds] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/family-relationship/create')
    }

    const unpackData = (familyRelationshipArray: FamilyRelationships[]): React.ReactNode[][] => {
        const data: React.ReactNode[][] = [];

        familyRelationshipArray.forEach(familyRelationship => {
            const row: React.ReactNode[] = [];
            row.push(<p>{familyRelationship.individualId1}</p>);
            row.push(<p>{familyRelationship.individualId2}</p>);
            row.push(<p>{familyRelationship.typeRelationship}</p>);
            data.push(row);
        });

        return data;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setC(['Особь 1', 'Особь 2', 'Тип отношений'].map((value: string) => ({ label: <p>{value}</p> })));
        setD(unpackData(objects));
        setIds(objects.map(accessAnimal => accessAnimal.self));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    const handleEdit = async (id: string) => {
        const familyRelationship = await getService.getFamilyRelationships(id);
        familyRelationshipsStore.setIndividualId1(familyRelationship.individualId1)
        familyRelationshipsStore.setIndividualId2(familyRelationship.individualId2)
        familyRelationshipsStore.setTypeRelationship(familyRelationship.typeRelationship)
        familyRelationshipsStore.setSelf(id)
        navigate('/family-relationship/update')
    }

    const handleDelete = async (id: string) => {
        await getService.deleteFamilyRelationships(id);
        handleFilterChange();
    }

    return (
        <Observer>
        {() => (
        <>
            {c && d && (
                
                <PageContainer>
                    <DivLine>
                    <BigIcon src={plus} onClick={handleClick} />
                    <h3>Создать новый объект</h3>
                </DivLine>
                    <Table
                    columns={c}
                    data={d}
                    id={ids}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
                </PageContainer>
            )}
        </>)}
        </Observer>
    );
}
                
export const BigIcon = styled.img`;
    height: 50px;
`
export const DivLine = styled.div<{}>`
    display: flex;
    flex-direction: row;
    min- width: 90vw;
    gap: 10px;   
`

export const PageContainer = styled.div`
    flex-direction: column;
    gap: 10px;  
    width: 100vw;
`
