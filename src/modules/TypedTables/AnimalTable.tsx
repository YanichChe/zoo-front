
import React, { useEffect, useState } from 'react'

import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { Animal } from '../../services/generalAnimalService/AnimalService.types';
import { GeneralAnimalService } from '../../services/generalAnimalService/GeneralAnimalService';

export default function AnimalTable() {
    const getService = new GeneralAnimalService (HTTPClient.getInstance())
    const [c, setC] = useState<Column[]>()
    const [d, setD] = useState<React.ReactNode[][]>()

    const unpackData = (animalArray: Animal[]): React.ReactNode[][] => {

        const data: React.ReactNode[][] = [];
    
        animalArray.forEach(animal => {
            const row: React.ReactNode[] = [];
            row.push(<p>{animal.animalTitle}</p>);
            row.push(<p>{animal.climateZone}</p>);
            row.push(<p>{animal.nutritionType}</p>);
            data.push(row);
        });

    
        return data;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList()
        setC(['Название животного' ,'Климатическая зона', 'Тип питания'].map((value: string) => ({ label: <p>{value}</p> })))
        setD(unpackData(objects))
    }

    useEffect(() => {
        handleFilterChange()
    }, [])


    return (
 
            <>
            {
                c!==undefined && d!== undefined && 
                <Table 
                columns={c}
                data={d}
            />
            } 
            </>

    );
}
