import { MaxDivLine, PageContainer } from "./Animals.styles";
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CellHistoryTable from "../modules/TypedTables/CellHistoryTable";
import AnimalTable from "../modules/TypedTables/AnimalTable";

export default function Tables() {

    const [selectedItem, setSelectedItem] = useState('');

    const handleItemClick = (item: string) => {
        setSelectedItem(item);
    };


    const handleFilterChange = async () => {
    }

    useEffect(() => {
        handleFilterChange()
        console.log(selectedItem)
    }, [selectedItem])


    return (
        <PageContainer>
            <MaxDivLine>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List>
                <ListItem disablePadding selected={selectedItem === "история клеток"}>
                    <ListItemButton onClick={() => handleItemClick("история клеток")}>
                    <ListItemText primary="история клеток" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding selected={selectedItem === "животные"}>
                    <ListItemButton onClick={() => handleItemClick("животные")}>
                    <ListItemText primary="животные" />
                    </ListItemButton>
                </ListItem>
                </List>
            </nav>
            </Box>
            {
                selectedItem === "история клеток" &&
                <CellHistoryTable />
            }
             {
                selectedItem === "животные" &&
                <AnimalTable />
            }
            </MaxDivLine>
        </PageContainer>
    );
}
