import React, { useState } from 'react';
import { MaxDivLine, PageContainer } from './Animals.styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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
import DietCharacteristicTable from '../modules/TypedTables/DietCharacteristicTable';
import DietTable from '../modules/TypedTables/DietTable';
import FoodProviderTable from '../modules/TypedTables/FoodProviderTable';
import ProviderHistoryTable from '../modules/TypedTables/ProviderHistoryTable';
import ProhibitedCombinationsSettlementTable from '../modules/TypedTables/ProhibitedCombinationsSettlementTable';
import ResponseAnimalTable from '../modules/TypedTables/ResponsibleAnimalTable';
import AccessAnimalTable from '../modules/TypedTables/AccessAnimalTable';

interface TableComponents {
  [key: string]: React.ComponentType<any>;
}

interface TableSection {
  sectionName: string;
  tables: { [key: string]: React.ComponentType<any> };
}

const tableSections: TableSection[] = [
  {
    sectionName: 'История',
    tables: {
      'История клеток': CellHistoryTable,
      'История болезней': DiseaseHistoryTable,
      'История особи': IndividualHistoryTable,
      'Статус истории особи': IndividualReceiptStatusTable,
      'История поставок': ProviderHistoryTable
    }
  },
  {
    sectionName: 'Животные',
    tables: {
      'Животные': AnimalTable,
      'Фактор размножения': OffspringFactorTable
    }
  },
  {
    sectionName: 'Отношения',
    tables: {
      'Семейные отношения': FamilyRelationshipTable,
      'Тип отношений': TypeRelationshipTable
    }
  },
  {
    sectionName: 'Кормление',
    tables: {
      'Размерности еды': DimensionTable,
      'Тип еды': FeedTypeTable,
      'Еда': FoodTable,
      'Тип питания': NutritionTypeTable,
      'Характеристики питания': DietCharacteristicTable,
      'Диета':DietTable,
      'Поставщики еды': FoodProviderTable,
    }
  },
  {
    sectionName: 'Медицина',
    tables: {
      'Болезни': DiseaseTable,
      'Вакцины': VaccinationTable,
      'Вакцинация особей': IndividualsVaccinationTable,
    }
  },
  {
    sectionName: 'Разное',
    tables: {
      'Климатические зоны': ClimateZoneTable,
      'Болезни': DiseaseTable,
      'Сезоны': SeasonTable,
      'Вакцинации': VaccinationTable,
      'Зоопарки': ZooTable,
      'Запрещенные расселения': ProhibitedCombinationsSettlementTable
    }
  },
  {
    sectionName: 'Животные-Сотрудники',
    tables: {
      'Доступ к животным': AccessAnimalTable,
      'Ответственные за животных': ResponseAnimalTable,
    }
  }
];

export default function Tables() {
  const [openSections, setOpenSections] = useState('');

  const [selectedItem, setSelectedItem] = useState('История клеток');
  const [selectedSection, setSelectedSection] = useState(0);

  const getSectionIndexByName = (sectionName: string): number => {
    const index = tableSections.findIndex(section => section.sectionName === sectionName);
    return index !== -1 ? index : 0;
  };

  const handleSectionClick = (sectionName: string) => {
    const index = getSectionIndexByName(sectionName);
    setSelectedSection(index);
    setSelectedItem('');
  };

  const handleItemClick = (item: string) => {
      setSelectedItem(item);
  };

  const toggleSection = (sectionName: string) => {
    handleSectionClick(sectionName);
    if (openSections === sectionName) setOpenSections('');
    else setOpenSections(sectionName)
  };

  return (
    <PageContainer>
      <MaxDivLine>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <Divider />
          <nav aria-label="secondary mailbox folders">
            <List>
              {tableSections.map((section) => (
                <div key={section.sectionName}>
                  <ListItem button onClick={() => toggleSection(section.sectionName) }>
                    <ListItemText primary={section.sectionName} />
                    {section.sectionName===openSections ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={section.sectionName===openSections } timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {Object.entries(section.tables).map(([tableName, TableComponent]) => (
                        <ListItem key={tableName} disablePadding selected={selectedItem === tableName}>
                        <ListItemButton onClick={() => handleItemClick(tableName)}>
                            <ListItemText primary={tableName} />
                        </ListItemButton>
                    </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </div>
              ))}
            </List>
          </nav>
        </Box>
    
        {selectedItem && React.createElement(tableSections[selectedSection].tables[selectedItem])}
  
      </MaxDivLine>
    </PageContainer>
  );
}