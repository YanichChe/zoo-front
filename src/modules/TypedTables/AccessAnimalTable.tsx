import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { AccessAnimalService } from '../../services/accessAnimalService/AccessAnimalService';
import { AccessAnimal } from '../../services/accessAnimalService/AccessAnimal.types';
import plus from "../../assets/plus.svg"
import { useNavigate } from 'react-router-dom';
import { accessAnimalStore } from '../../pages/accessAnimal/accessAnimalStore';
import { Observer } from 'mobx-react';

export default function AccessAnimalTable() {
    const getService = new AccessAnimalService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>([]);
    const [data, setData] = useState<React.ReactNode[][]>([]);
    const [ids, setIds] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/access-animal/create')
    }

    const unpackData = (accessAnimalArray: AccessAnimal[]): React.ReactNode[][] => {
        return accessAnimalArray.map(accessAnimal => [
            <p>{accessAnimal.staff}</p>,
            <p>{accessAnimal.individual}</p>,
            <p>{accessAnimal.dateStart}</p>,
            <p>{accessAnimal.dateEnd}</p>
        ]);
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Сотрудник', 'Особь', 'Дата начала', 'Дата конца'].map((value: string) => ({ label: <p>{value}</p> })));
        const unpackedData = unpackData(objects);
        setData(unpackedData);
        setIds(objects.map(accessAnimal => accessAnimal.self));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    const handleEdit = async (id: string) => {
        const accessAnimal = await getService.getAccessAnimal(id);
        accessAnimalStore.setDateEnd(accessAnimal.dateEnd === null ? '' : accessAnimal.dateEnd)
        accessAnimalStore.setDateStart(accessAnimal.dateStart)
        accessAnimalStore.setIndividual(accessAnimal.individual)
        accessAnimalStore.setStaff(accessAnimal.staff)
        accessAnimalStore.setSelf(id)
        console.log('!!!! ' + accessAnimal.individual)
        navigate('/access-animal/update')
    }

    const handleDelete = async (id: string) => {
        await getService.deleteAccessAnimal(id);
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
