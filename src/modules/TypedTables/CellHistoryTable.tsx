
import React, { useEffect, useState } from 'react'

import { CellHistory } from '../../services/cellHistoryService/CellHistory.types';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { CellHistoryService } from '../../services/cellHistoryService/CellHistoryService';

export default function CellHistoryTable() {
    const getService = new CellHistoryService (HTTPClient.getInstance())
    const [c, setC] = useState<Column[]>()
    const [d, setD] = useState<React.ReactNode[][]>()

    const unpackData = (cellHistoryArray: CellHistory[]): React.ReactNode[][] => {

        const data: React.ReactNode[][] = [];
    
        cellHistoryArray.forEach(cellHistory => {
            const row: React.ReactNode[] = [];
            row.push(<p>{cellHistory.dateStart}</p>);
            row.push(<p>{cellHistory.dateEnd}</p>);
            row.push(<p>{cellHistory.cellNumber}</p>);
            row.push(<p>{cellHistory.individualName}</p>);
            data.push(row);
        });

    
        return data;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList()
        setC(['Дата начала' ,'Дата конца', 'Номер клетки', 'Особь'].map((value: string) => ({ label: <p>{value}</p> })))
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
