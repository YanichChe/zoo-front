import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { IndividualHistoryService } from '../../services/individualHistoryService/IndividualHistoryService';
import { IndividualHistory } from '../../services/individualHistoryService/IndividualHistory.types';
import plus from "../../assets/plus.svg"
import { useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { individualHistoryStore } from '../../pages/individualHistory/individualHistoryStore';

export default function IndividualHistoryTable() {
    const getService = new IndividualHistoryService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();
    const [ids, setIds] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/individual-history/create')
    }

    const unpackData = (individualHistoryArray: IndividualHistory[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        individualHistoryArray.forEach(individualHistory => {
            const row: React.ReactNode[] = [];
            row.push(<p>{individualHistory.receiptDate}</p>);
            row.push(<p>{individualHistory.individual}</p>);
            row.push(<p>{individualHistory.individualStatus}</p>);
            row.push(<p>{individualHistory.zoo}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Дата поступления', 'Индивидуальный объект', 'Статус индивидуального объекта', 'Зоопарк'].map((value: string) => ({ label: <p>{value}</p> })));
        setData(unpackData(objects));
        setIds(objects.map(individualHistory => individualHistory.self));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    const handleEdit = async (id: string) => {
        const individualHistory = await getService.getIndividualHistory(id);
        individualHistoryStore.setReceiptDate(individualHistory.receiptDate)
        individualHistoryStore.setSelf(id)
        individualHistoryStore.setIndividual(individualHistory.individual)
        individualHistoryStore.setIndividualStatus(individualHistory.individualStatus)
        individualHistoryStore.setZoo(individualHistory.zoo)
        navigate('/individual-history/update')
    }

    const handleDelete = async (id: string) => {
        await getService.deleteIndividualHistory(id);
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

