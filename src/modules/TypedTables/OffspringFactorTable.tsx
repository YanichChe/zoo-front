import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { OffspringFactorService } from '../../services/offspringFactorService/OffspringFactorService';
import { OffspringFactor } from '../../services/offspringFactorService/OffspringFactor.types';
import plus from "../../assets/plus.svg"
import { useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { offspringFactorsStore } from '../../pages/offspringFactors/offspringFactorsStore';


export default function OffspringFactorTable() {
    const getService = new OffspringFactorService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();
    const [ids, setIds] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/offspring-factor/create')
    }

    const unpackData = (offspringFactorArray: OffspringFactor[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        offspringFactorArray.forEach(offspringFactor => {
            const row: React.ReactNode[] = [];
            row.push(<p>{offspringFactor.animal}</p>);
            row.push(<p>{offspringFactor.physicalState}</p>);
            row.push(<p>{offspringFactor.ageStart}</p>);
            row.push(<p>{offspringFactor.ageEnd}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns(['Животное', 'Физическое состояние', 'Начальный возраст', 'Конечный возраст'].map((value: string) => ({ label: <p>{value}</p> })));
        setData(unpackData(objects));
        setIds(objects.map(offspringfactor => offspringfactor.self));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    const handleEdit = async (id: string) => {
        const offspringFactor = await getService.getOffspringFactor(id);
        offspringFactorsStore.setAgeEnd(offspringFactor.ageEnd)
        offspringFactorsStore.setAgeStart(offspringFactor.ageStart)
        offspringFactorsStore.setAnimalId(offspringFactor.animal)
        offspringFactorsStore.setPhysicalStateId(offspringFactor.physicalState)
        offspringFactorsStore.setSelf(id)

        navigate('/offspring-factor/update')
    }

    const handleDelete = async (id: string) => {
        await getService.deleteOffspringFactor(id);
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

