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

export const CenterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    width: 100%;
    gap: 25px;
    justify-content: center; /* Центрирование по горизонтали */
    align-items: center; /* Центрирование по вертикали */
    height: fit-content;
    padding: 10px;
    text-align: center;
    box-sizing: border-box;
    overflow: auto;
`

export const MarginContainer = styled.div`
    margin-top: auto;
    margin-left: auto;
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

export const SizePartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 600px;
    gap: 10px;
    height: 600px;
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

export const SizeImageContainer = styled(PartContainer)`
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
    height: 600px;
    width: 600px;
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
    width: 28px;
    height: 28px;
`
export const BigIcon = styled.img`;
    height: 50px;
`
export const DivLine = styled.div<{}>`
    display: flex;
    flex-direction: row;
    width: fit-content;
    gap: 10px;
    
`
export const MaxDivLine = styled.div<{}>`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 10px;
    
`
