import React, { useEffect, useState } from 'react';
import { HTTPClient } from '../../common/HTTPClient';
import { Column, Table } from '../../components/table/Table';
import { FullVaccinationInfoService } from '../../services/fullVaccinationService/FullVaccinationInfoService';
import { FullVaccinationInfo } from '../../services/fullVaccinationService/FullVaccinationInfo.types';
import { TableSimple } from '../../components/table/TableSimple';

export default function FullVaccinationInfoTable() {
    const getService = new FullVaccinationInfoService(HTTPClient.getInstance());
    const [columns, setColumns] = useState<Column[]>();
    const [data, setData] = useState<React.ReactNode[][]>();

    const unpackData = (fullVaccinationInfoArray: FullVaccinationInfo[]): React.ReactNode[][] => {
        const unpackedData: React.ReactNode[][] = [];

        fullVaccinationInfoArray.forEach(fullVaccinationInfo => {
            const row: React.ReactNode[] = [];
            row.push(<p>{fullVaccinationInfo.name}</p>);
            row.push(<p>{fullVaccinationInfo.animalTitle}</p>);
            row.push(<p>{fullVaccinationInfo.height}</p>);
            row.push(<p>{fullVaccinationInfo.weight}</p>);
            row.push(<p>{fullVaccinationInfo.vaccinationName}</p>);
            row.push(<p>{fullVaccinationInfo.birthday}</p>);
            row.push(<p>{fullVaccinationInfo.dateAppearance}</p>);
            row.push(<p>{fullVaccinationInfo.dateDisappearance}</p>);
            row.push(<p>{fullVaccinationInfo.age}</p>);
            row.push(<p>{fullVaccinationInfo.cellNumber}</p>);
            unpackedData.push(row);
        });

        return unpackedData;
    };

    const handleFilterChange = async () => {
        const objects = await getService.getList();
        setColumns([

            'Name', 
            'Animal Title', 
            'Height', 
            'Weight', 
            'Vaccination Name', 
            'Birthday', 
            'Date Appearance', 
            'Date Disappearance', 
            'Age', 
            'Cell Number'
        ].map((value: string) => ({ label: <p>{value}</p> })));
        setData(unpackData(objects));
    };

    useEffect(() => {
        handleFilterChange();
    }, []);

    return (
        <>
            {columns && data && (
                <TableSimple
                    columns={columns}
                    data={data}
                />
            )}
        </>
    );
}
