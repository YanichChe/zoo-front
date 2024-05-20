import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import styled from "styled-components";
import { Column, Table } from '../../components/table/Table';
import { IndividualsVaccinationService } from '../../services/individualsVaccinationService/IndividualVaccinationService';
import { IndividualsVaccination } from '../../services/individualsVaccinationService/IndividualVaccination.types';
import plus from "../../assets/plus.svg"
import { useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { individualsVaccinationStore } from '../../pages/individualVaccination/individualVaccinationStore';

export default function IndividualsVaccinationTable() {
    const getService = new IndividualsVaccinationService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();
    const [ids, setIds] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/inidividual-vaccination/create')
    }

    const unpackData = (individualsVaccinationArray: IndividualsVaccination[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        individualsVaccinationArray.forEach(individualsVaccination => {
            const row: React.ReactNode[] = [];
            row.push(<p>{individualsVaccination.individual}</p>);
            row.push(<p>{individualsVaccination.vaccination}</p>);
            row.push(<p>{individualsVaccination.staff}</p>);
            row.push(<p>{individualsVaccination.date}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Индивидуальный объект', 'Вакцинация', 'Персонал', 'Дата'].map((value: string) => ({ label: <p>{value}</p> })));
        setData(unpackData(objects));
        setIds(objects.map(accessAnimal => accessAnimal.self));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    const handleEdit = async (id: string) => {
        const individualsVaccination = await getService.getIndividualsVaccination(id);
        individualsVaccinationStore.setDate(individualsVaccination.date);
        individualsVaccinationStore.setIndividual(individualsVaccination.individual);
        individualsVaccinationStore.setStaff(individualsVaccination.staff);
        individualsVaccinationStore.setVacccination(individualsVaccination.vaccination);
        individualsVaccinationStore.setSelf(id);
        navigate('/inidividual-vaccination/update')
    }

    const handleDelete = async (id: string) => {
        await getService.deleteindividualsVaccination(id);
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
