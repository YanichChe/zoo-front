import styled from "styled-components";

export const GridContainer = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 7vh;
        padding: 10px;
        text-align: center;
        box-sizing: border-box;
        column-gap: 50px;
        overflow: hidden;
    `

export const ItemsContainer = styled.div`
        display: flex;
        justify-content: center;
        align-content: center;
        width: 100%;
        height: 95%;
        min-height: fit-content;
        padding: 10px;
        text-align: center;
        box-sizing: border-box;
        column-gap: 120px;
        overflow: auto;
    `