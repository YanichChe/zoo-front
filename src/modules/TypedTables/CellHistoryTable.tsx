
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { CellHistory } from '../../services/cellHistoryService/CellHistory.types';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { CellHistoryService } from '../../services/cellHistoryService/CellHistoryService';
import plus from "../../assets/plus.svg"
import { Observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { cellHistoryStore } from '../../pages/cellHistory/cellHistoryStore';

export default function CellHistoryTable() {
    const getService = new CellHistoryService (HTTPClient.getInstance())
    const [c, setC] = useState<Column[]>()
    const [d, setD] = useState<React.ReactNode[][]>()
    const [ids, setIds] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/cell-history/create')
    }

    const unpackData = (cellHistoryArray: CellHistory[]): React.ReactNode[][] => {

        const data: React.ReactNode[][] = [];
    
        cellHistoryArray.forEach(cellHistory => {
            const row: React.ReactNode[] = [];
            row.push(<p>{cellHistory.dateStart}</p>);
            row.push(<p>{cellHistory.dateEnd}</p>);
            row.push(<p>{cellHistory.cellNumber}</p>);
            row.push(<p>{cellHistory.individualName}</p>);
            data.push(row);
        });

    
        return data;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList()
        setC(['Дата начала' ,'Дата конца', 'Номер клетки', 'Особь'].map((value: string) => ({ label: <p>{value}</p> })))
        setD(unpackData(objects))
        setIds(objects.map(cellHistory => cellHistory.self));
    }

    const handleEdit = async (id: string) => {
        const cellHistory = await getService.getCellHistory(id);
        cellHistoryStore.setDateEnd(cellHistory.dateEnd === null ? '' : cellHistory.dateEnd)
        cellHistoryStore.setDateStart(cellHistory.dateStart)
        cellHistoryStore.setIndividual(cellHistory.individualName)
        cellHistoryStore.setSelf(id)
        cellHistoryStore.setNumber(cellHistory.cellNumber)
        navigate('/cell-history/update')
    }

    const handleDelete = async (id: string) => {
        await getService.deleteCellHistory(id);
        handleFilterChange();
    }

    useEffect(() => {
        handleFilterChange()
    }, [])


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
