import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { DietService } from '../../services/dietService/DietService';
import { Diet } from '../../services/dietService/Diet.types';
import plus from "../../assets/plus.svg"
import { useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react';
import styled from "styled-components";
import { dietStore } from '../../pages/diet/dietStore';

export default function DietTable() {
    const getService = new DietService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();
    const [ids, setIds] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/diet/create')
    }

    const unpackData = (dietArray: Diet[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        dietArray.forEach(diet => {
            const row: React.ReactNode[] = [];
            row.push(<p>{diet.count}</p>);
            row.push(<p>{diet.time}</p>);
            row.push(<p>{diet.dietCharacteristics}</p>);
            row.push(<p>{diet.food}</p>);
            row.push(<p>{diet.dimension}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Количество', 'Время', 'Характеристики диеты', 'Еда', 'Размерность'].map((value: string) => ({ label: <p>{value}</p> })));
        setData(unpackData(objects));
        setIds(objects.map(individualHistory => individualHistory.self));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    const handleEdit = async (id: string) => {
        const individualHistory = await getService.getDiet(id);
        dietStore.setCount(individualHistory.count)
        dietStore.setTime(individualHistory.time)
        dietStore.setDietCharacteristics(individualHistory.dietCharacteristics)

        dietStore.setFood(individualHistory.food)
        dietStore.setDimension(individualHistory.dimension)
        dietStore.setSelf(individualHistory.self)
        navigate('/diet/update')
    }

    const handleDelete = async (id: string) => {
        await getService.deleteDiet(id);
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
