import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { ProhibitedCombinationsSettlementService } from '../../services/prohibitedCombinationsSettlement/ProhibitedService';
import { ProhibitedCombinationsSettlement } from '../../services/prohibitedCombinationsSettlement/Prohibited.types';
import plus from "../../assets/plus.svg"
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { prohibitedStore } from '../../pages/prohibited/prohibitedStore';

export default function ProhibitedCombinationsSettlementTable() {
    const getService = new ProhibitedCombinationsSettlementService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();
    const [ids, setIds] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/prohibited/create')
    }

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
        setIds(objects.map(prohibited => prohibited.self));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    const handleEdit = async (id: string) => {
        const prohibited = await getService.getProhibited(id);
        prohibitedStore.setAnimal1(prohibited.animalId1)
        prohibitedStore.setAnimal2(prohibited.animalId2)
        prohibitedStore.setSelf(id)
        navigate('/prohibited/update')
    }

    const handleDelete = async (id: string) => {
        await getService.deleteProhibited(id);
        handleFilterChange();
    }

    return (
        <Observer>
        {() => (
        <>
            {columns && data && (
                
                <PageContainer>
                    <DivLine>
                    <BigIcon src={plus} onClick={handleClick} />
                    <h3>Создать новый объект</h3>
                </DivLine>
                    <Table
                    columns={columns}
                    data={data}
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
