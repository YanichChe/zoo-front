import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { DietCharacteristicService } from '../../services/dietCharacteristicService/DietCharacteristicService';
import { DietCharacteristic } from '../../services/dietCharacteristicService/DietCharacteristic.types';
import plus from "../../assets/plus.svg"
import { useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react';
import styled from "styled-components";
import { dietCharacteristicStore } from '../../pages/dietCharacterictic/dietCharactericticStore';

export default function DietCharacteristicTable() {
    const getService = new DietCharacteristicService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const [ids, setIds] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/diet-characteristic/create')
    }

    const unpackData = (dietCharacteristicArray: DietCharacteristic[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        dietCharacteristicArray.forEach(dietCharacteristic => {
            const row: React.ReactNode[] = [];
            row.push(<p>{dietCharacteristic.age}</p>);
            row.push(<p>{dietCharacteristic.physicalState}</p>);
            row.push(<p>{dietCharacteristic.season}</p>);
            row.push(<p>{dietCharacteristic.animal}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Возраст', 'Физическое состояние', 'Сезон', 'Животное'].map((value: string) => ({ label: <p>{value}</p> })));
        setData(unpackData(objects));
        setIds(objects.map(accessAnimal => accessAnimal.self));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    const handleEdit = async (id: string) => {
        const dietCharacteristic = await getService.getDietCharacteristic(id);
        dietCharacteristicStore.setAge(dietCharacteristic.age);
        dietCharacteristicStore.setAnimal(dietCharacteristic.animal);
        dietCharacteristicStore.setPhysicalState(dietCharacteristic.physicalState);
        dietCharacteristicStore.setSeason(dietCharacteristic.season);
        dietCharacteristicStore.setSelf(id);
        navigate('/diet-characteristic/update')
    }

    const handleDelete = async (id: string) => {
        await getService.deleteDietCharacteristic(id);
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
