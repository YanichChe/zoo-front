import styled from "styled-components";

export const PageContainer = styled.div`
    height: fit-content;
    min-height: 80vh;
    box-sizing: border-box;
    padding: 30px 70px;
`

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    width: 100%;
    gap: 25px;
    height: fit-content;
    padding: 10px;
    text-align: center;
    box-sizing: border-box;
    overflow: auto;
`

export const SearchContainer = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    gap: 5px;

`
export const PartContainer = styled.div`
    display: flex;
    flex-direction: column;

    align-content: center;
    width: 50%;
    gap: 10px;
    height: 400px;
    padding: 10px;
    text-align: center;
    box-sizing: border-box;
    overflow: auto;
    border: 1px solid;
`
export const ImageContainer = styled(PartContainer)`
    width: 400px;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
    justify-content: center;
    align-content: center;
    align-items: center;
`

export const Image = styled.img`
    width: 90%;
    height: 90%;
    object-fit: cover;
`
export const Icon = styled.img`;
    padding: 10px;
    height: 30px;
`