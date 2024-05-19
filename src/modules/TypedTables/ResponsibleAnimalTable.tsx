import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { ResponsibleAnimalService } from '../../services/responsibleAnimalService/ResponsibleAnimalService';
import { ResponsibleAnimal } from '../../services/responsibleAnimalService/ResponsibleAnimal.types';
import plus from "../../assets/plus.svg"
import { useNavigate } from 'react-router-dom';
import { responsibleAnimalStore } from '../../pages/responseAnimal/responseAnimalStore';
import { Observer } from 'mobx-react';

export default function ResponsibleAnimalTable() {
    const getService = new ResponsibleAnimalService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>([]);
    const [data, setData] = useState<React.ReactNode[][]>([]);
    const [ids, setIds] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/response-animal/create')
    }

    const unpackData = (ResponsibleAnimalArray: ResponsibleAnimal[]): React.ReactNode[][] => {
        return ResponsibleAnimalArray.map(ResponsibleAnimal => [
            <p>{ResponsibleAnimal.staff}</p>,
            <p>{ResponsibleAnimal.individual}</p>,
            <p>{ResponsibleAnimal.dateStart}</p>,
            <p>{ResponsibleAnimal.dateEnd}</p>
        ]);
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Сотрудник', 'Особь', 'Дата начала', 'Дата конца'].map((value: string) => ({ label: <p>{value}</p> })));
        const unpackedData = unpackData(objects);
        setData(unpackedData);
        setIds(objects.map(ResponsibleAnimal => ResponsibleAnimal.self));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    const handleEdit = async (id: string) => {
        const ResponsibleAnimal = await getService.getResponsibleAnimal(id);
        responsibleAnimalStore.setDateEnd(ResponsibleAnimal.dateEnd === null ? '' : ResponsibleAnimal.dateEnd)
        responsibleAnimalStore.setDateStart(ResponsibleAnimal.dateStart)
        responsibleAnimalStore.setIndividual(ResponsibleAnimal.individual)
        responsibleAnimalStore.setStaff(ResponsibleAnimal.staff)
        responsibleAnimalStore.setSelf(id)
        navigate('/response-animal/update')
    }

    const handleDelete = async (id: string) => {
        await getService.deleteResponsibleAnimal(id);
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
