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
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();
    const [ids, setId] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/access-animal/create')
    }

    const unpackData = (accessAnimalArray: AccessAnimal[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        accessAnimalArray.forEach(accessAnimal => {
            const row: React.ReactNode[] = [];
            row.push(<p>{accessAnimal.staff}</p>);
            row.push(<p>{accessAnimal.individual}</p>);
            row.push(<p>{accessAnimal.dateStart}</p>);
            row.push(<p>{accessAnimal.dateEnd}</p>);
            ids.push(accessAnimal.self);
            unpackedData.push(row);

            console.log(accessAnimal.individual + ' ' + ' ' + accessAnimal.self)
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Сотрудник', 'Особь', 'Дата начала', 'Дата конца'].map((value: string) => ({ label: <p>{value}</p> })));
        setData(unpackData(objects));
    };

    useEffect(() => {
        handleFilterChange();
    }, [ids]);

    const handleEdit = async(id: string) => {
        console.log(id)
        const accessAnimal = await getService.getAccessAnimal(id);
        console.log(accessAnimal)

        accessAnimalStore.setDateEnd(accessAnimal.dateEnd === null ? '' : accessAnimal.dateEnd)
        accessAnimalStore.setDateStart(accessAnimal.dateStart)
        accessAnimalStore.setIndividual(accessAnimal.individual)
        accessAnimalStore.setStaff(accessAnimal.staff)
        accessAnimalStore.setSelf(id)

        navigate('/access-animal/update')
    }

    const handleDelete = async(id: string) => {
        const code  = await getService.deleteAccessAnimal(id)
        console.log(code)
        setId([])
        handleFilterChange()
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
