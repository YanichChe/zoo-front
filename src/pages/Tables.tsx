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
import ClimateZoneTable from '../modules/TypedTables/ClimateZoneTable';
import DimensionTable from '../modules/TypedTables/DimensionTable';
import DiseaseTable from '../modules/TypedTables/DiseaseTable';
import FeedTypeTable from '../modules/TypedTables/FeedTypeTable';
import FoodTable from '../modules/TypedTables/FoodTable';
import NutritionTypeTable from '../modules/TypedTables/NutritionTypeTable';
import SeasonTable from '../modules/TypedTables/SeasonTable';
import TypeRelationshipTable from '../modules/TypedTables/TypeRelationshipTable';
import VaccinationTable from '../modules/TypedTables/VaccinationTable';
import ZooTable from '../modules/TypedTables/ZooTable';

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
                            'история особи', 'статус истории особи', 'фактор размножения', 'вакцинации особей', 'климатические зоны', 
                            'размерности еды', 'болезни', 'тип еды', 'еда', 'тип питания', 'сезоны', 
                            'тип отношений', 'вакцинации', 'зоопарки'].map((item) => (
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
                {selectedItem === 'климатические зоны' && <ClimateZoneTable />}
                {selectedItem === 'размерности еды' && <DimensionTable />}       
                {selectedItem === 'болезни' && <DiseaseTable />}       
                {selectedItem === 'тип еды' && <FeedTypeTable />}       
                {selectedItem === 'еда' && <FoodTable />}       
                {selectedItem === 'тип питания' && <NutritionTypeTable />}       
                {selectedItem === 'сезоны' && <SeasonTable />}       
                {selectedItem === 'тип отношений' && <TypeRelationshipTable />}       
                {selectedItem === 'вакцинации' && <VaccinationTable />}       
                {selectedItem === 'зоопарки' && <ZooTable />}                          
            </MaxDivLine>
        </PageContainer>
    );
}
