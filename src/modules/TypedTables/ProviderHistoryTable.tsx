import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { ProviderHistoryService } from '../../services/providerHistoryService/ProviderHistoryService';
import { ProviderHistory } from '../../services/providerHistoryService/ProviderHistory.types';
import plus from "../../assets/plus.svg"
import { useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { providerHistoryStore } from '../../pages/providerHistory/providerHistoryStore';

export default function ProviderHistoryTable() {
    const getService = new ProviderHistoryService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();
    const [ids, setIds] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/provider-history/create')
    }

    const unpackData = (providerHistoryArray: ProviderHistory[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        providerHistoryArray.forEach(providerHistory => {
            const row: React.ReactNode[] = [];
            row.push(<p>{providerHistory.date}</p>);
            row.push(<p>{providerHistory.number}</p>);
            row.push(<p>{providerHistory.price}</p>);
            row.push(<p>{providerHistory.food}</p>);
            row.push(<p>{providerHistory.provider}</p>);
            row.push(<p>{providerHistory.dimension}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Дата', 'Количество', 'Цена', 'Еда', 'Поставщик', 'Измерение'].map((value: string) => ({ label: <p>{value}</p> })));
        setData(unpackData(objects));
        setIds(objects.map(individualHistory => individualHistory.self));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    const handleEdit = async (id: string) => {
        const individualHistory = await getService.getProviderHistory(id);
        providerHistoryStore.setDate(individualHistory.date)
        providerHistoryStore.setNumber(individualHistory.number)
        providerHistoryStore.setPrice(individualHistory.price)
        providerHistoryStore.setFood(individualHistory.food)
        providerHistoryStore.setProvider(individualHistory.provider)
        providerHistoryStore.setDimension(individualHistory.dimension)
        providerHistoryStore.setSelf(id)

        console.log(individualHistory.date, individualHistory.number, individualHistory.price, individualHistory.food)
        navigate('/provider-history/update')
    }

    const handleDelete = async (id: string) => {
        await getService.deleteProviderHistory(id);
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

