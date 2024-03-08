import {Variant} from "../../styles/tc/types";
import {Button} from "../../components/button/Button";
import React from "react";
import {HeaderText, PlainText} from "../../components/text/Text";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

export function Menu() {

    const GridContainer = styled.div`
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

    const ItemsContainer = styled.div`
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
    const navigate = useNavigate()
    const handleMain = async () => {
        navigate('/')
    }

    const handleLogin = async () => {
        navigate('/login')
    }

    return (
        <GridContainer>
            <HeaderText
                config={{
                    size: 36,
                    text: 'zoo',
                    bold: true,
                    variant: Variant.SECONDARY,
                    forcedSmallCase: true,
                }}
            />
            <ItemsContainer>
                <PlainText
                    config={{
                        size: 16,
                        text: 'главная',
                        bold: false,
                        variant: Variant.PRIMARY,
                        forcedSmallCase: true,
                        onClick: handleMain,
                        isOnClick: true,
                    }}
                />
                <PlainText
                    config={{
                        size: 16,
                        text: 'животные',
                        bold: false,
                        variant: Variant.PRIMARY,
                        forcedSmallCase: true,
                    }}
                />
                <PlainText
                    config={{
                        size: 16,
                        text: 'сотрудники',
                        bold: false,
                        variant: Variant.PRIMARY,
                        forcedSmallCase: true,
                    }}
                />
            </ItemsContainer>

            <PlainText
                config={{
                    size: 16,
                    text: 'Контакты',
                    bold: true,
                    variant: Variant.PRIMARY,
                    forcedSmallCase: true,
                }}
            />
            <Button
                config={{
                    fullWidth: false,
                    size: 12,
                    text: 'Войти',
                    variant: Variant.PRIMARY,
                    onClick: handleLogin
                }}
            />

        </GridContainer>
    )
}