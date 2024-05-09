import React, { useState } from 'react';
import { MaxDivLine, PageContainer } from './Animals.styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CellHistoryTable from '../modules/TypedTables/CellHistoryTable';
import AnimalTable from '../modules/TypedTables/AnimalTable';
import DiseaseHistoryTable from '../modules/TypedTables/DiseaseHistoryTable';
import FamilyRelationshipTable from '../modules/TypedTables/FamilyRelationshipTable';
import IndividualHistoryTable from '../modules/TypedTables/IndividualHistoryTable';
import IndividualReceiptStatusTable from '../modules/TypedTables/IndividualReceiptStatusTable';
import OffspringFactorTable from '../modules/TypedTables/OffspringFactorTable';
import IndividualsVaccinationTable from '../modules/TypedTables/IndividualsVaccinationTable';

export default function Tables() {
    const [selectedItem, setSelectedItem] = useState('история клеток');

    const handleItemClick = (item: string) => {
        setSelectedItem(item);
    };

    return (
        <PageContainer>
            <MaxDivLine>
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <Divider />
                    <nav aria-label="secondary mailbox folders">
                        <List>
                            {['история клеток', 'животные', 'история болезней', 'семейные отношения', 
                            'история особи', 'статус истории особи', 'фактор размножения', 'вакцинации особей'].map((item) => (
                                <ListItem key={item} disablePadding selected={selectedItem === item}>
                                    <ListItemButton onClick={() => handleItemClick(item)}>
                                        <ListItemText primary={item} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </nav>
                </Box>
                {selectedItem === 'история клеток' && <CellHistoryTable />}
                {selectedItem === 'животные' && <AnimalTable />}
                {selectedItem === 'история болезней' && <DiseaseHistoryTable />}
                {selectedItem === 'семейные отношения' && <FamilyRelationshipTable />}
                {selectedItem === 'история особи' && <IndividualHistoryTable />}
                {selectedItem === 'статус истории особи' && <IndividualReceiptStatusTable />}
                {selectedItem === 'фактор размножения' && <OffspringFactorTable />}
                {selectedItem === 'вакцинации особей' && <IndividualsVaccinationTable />}

            </MaxDivLine>
        </PageContainer>
    );
}
