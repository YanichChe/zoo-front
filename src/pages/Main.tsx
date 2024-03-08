import styled from "styled-components";
import background from '../assets/back.png'
import {Variant} from "../styles/tc/types";
import {HeaderText, PlainText} from "../components/text/Text";
import React from "react";
import {Button} from "../components/button/Button";
import {useNavigate} from "react-router-dom";

export default function Main() {

    const Container = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        width: 100vw;
        gap: 20px;
        height: 92vh;
        padding: 10px;
        text-align: center;
        box-sizing: border-box;
        overflow: auto;
        background: url(${background});
    `
    const ButtonContainer = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px;
        text-align: center;
        box-sizing: border-box;
        column-gap: 30px;
        overflow: hidden;
    `
    const navigate = useNavigate()

    const handleClick = async () => {
        navigate('/login')
    }

    return (
        <Container>
            <HeaderText
                config={{
                    size: 42,
                    text: 'Добро пожаловать на портал зоопарка',
                    bold: true,
                    variant: Variant.PRIMARY,
                    forcedSmallCase: true,
                }}
            />
            <PlainText
                config={{
                    size: 24,
                    text: 'Контролируйте все процессы в одном месте',
                    bold: false,
                    variant: Variant.SECONDARY,
                    forcedSmallCase: true,
                }}
            />
            <ButtonContainer>
                <Button
                    config={{
                        fullWidth: false,
                        size: 12,
                        text: 'Войти',
                        variant: Variant.PRIMARY,
                        onClick: handleClick

                    }}
                />
                <PlainText
                    config={{
                        size: 16,
                        text: 'Узнать больше ->',
                        bold: false,
                        variant: Variant.PRIMARY,
                        forcedSmallCase: true,
                    }}
                />
            </ButtonContainer>
        </Container>
    )
}