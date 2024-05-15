import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { AccessAnimalService } from '../../services/accessAnimalService/AccessAnimalService';
import { AccessAnimal } from '../../services/accessAnimalService/AccessAnimal.types';
import plus from "../../assets/plus.svg"
import { useNavigate } from 'react-router-dom';

export default function AccessAnimalTable() {
    const getService = new AccessAnimalService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();
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
            unpackedData.push(row);
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
    }, []);

    return (
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
                />
                </PageContainer>
            )}
        </>
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