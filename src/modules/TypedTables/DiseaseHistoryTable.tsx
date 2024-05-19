import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { DiseaseHistory } from '../../services/diseaseHistoryService/DiseaseHistory.types';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { DiseaseHistoryService } from '../../services/diseaseHistoryService/DiseaseHistoryService';
import plus from "../../assets/plus.svg"
import { useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { diseaseHistoryStore } from '../../pages/diseaseHistory/diseaseHistoreStore';


export default function DiseaseHistoryTable() {
    const getService = new DiseaseHistoryService(HTTPClient.getInstance())
    const [c, setC] = useState<Column[]>()
    const [d, setD] = useState<React.ReactNode[][]>()
    const [ids, setIds] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/disease-history/create')
    }

    const unpackData = (diseaseHistoryArray: DiseaseHistory[]): React.ReactNode[][] => {

        const data: React.ReactNode[][] = [];
    
        diseaseHistoryArray.forEach(diseaseHistory => {
            const row: React.ReactNode[] = [];
            row.push(<p>{diseaseHistory.dateStart}</p>);
            row.push(<p>{diseaseHistory.dateEnd}</p>);
            row.push(<p>{diseaseHistory.disease}</p>);
            row.push(<p>{diseaseHistory.individualName}</p>);
            data.push(row);
        });

    
        return data;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList()
        setC(['Дата начала' ,'Дата конца', 'Номер болезни', 'Особь'].map((value: string) => ({ label: <p>{value}</p> })))
        setD(unpackData(objects))
        setIds(objects.map(accessAnimal => accessAnimal.self));
    }

    useEffect(() => {
        handleFilterChange()
    }, [])

    const handleEdit = async (id: string) => {
        const diseaseHistory = await getService.getDiseaseHistory(id);
        diseaseHistoryStore.setDateEnd(diseaseHistory.dateEnd === null ? '' : diseaseHistory.dateEnd)
        diseaseHistoryStore.setDateStart(diseaseHistory.dateStart)
        diseaseHistoryStore.setIndividual(diseaseHistory.individualName)
        diseaseHistoryStore.setDisease(diseaseHistory.disease)
        diseaseHistoryStore.setSelf(id)
        navigate('/disease-history/update')
    }

    const handleDelete = async (id: string) => {
        await getService.deleteDiseaseHistory(id);
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
