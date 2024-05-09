import React, { useEffect, useState } from 'react'

import { DiseaseHistory } from '../../services/diseaseHistoryService/DiseaseHistory.types';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { DiseaseHistoryService } from '../../services/diseaseHistoryService/DiseaseHistoryService';

export default function DiseaseHistoryTable() {
    const getService = new DiseaseHistoryService(HTTPClient.getInstance())
    const [c, setC] = useState<Column[]>()
    const [d, setD] = useState<React.ReactNode[][]>()

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
    }

    useEffect(() => {
        handleFilterChange()
    }, [])


    return (
 
            <>
            {
                c !== undefined && d !== undefined && 
                <Table 
                columns={c}
                data={d}
            />
            } 
            </>

    );
}
