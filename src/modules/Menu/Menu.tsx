import { Variant } from "../../styles/tc/types";
import { Button } from "../../components/button/Button";
import React from "react";
import { HeaderText, PlainText } from "../../components/text/Text";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TextAlign } from "../../components/text/Text.types";
import { GridContainer, ItemsContainer } from "./Menu.styles";

export function Menu() {

    type PathConfig = {
        displayName: string
        path: string
    }

    const config: PathConfig[] = [
        { displayName: 'главная', path: '/' },
        { displayName: 'животные', path: '/animals' },
        { displayName: 'сотрудники', path: '/staffs' },
    ]

    const location = useLocation()
    const navigate = useNavigate()
    const currentPath = location.pathname

    const handleMain = async () => {
        navigate('/')
    }

    const handleLogin = async () => {
        navigate('/login')
    }

    function isBold(path: string, currentPath: string): boolean {
        return path === currentPath
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
                    align: TextAlign.LEFT,
                }}
            />
            <ItemsContainer>
                {config.map((PathConfig) => (
                    <Link style={{textDecoration: 'none'}} key={PathConfig.path} to={PathConfig.path}>
                        {isBold(PathConfig.path, currentPath) ? (
                                <PlainText
                                    config={{
                                        size: 16,
                                        text: PathConfig.displayName,
                                        bold: true,
                                        variant: Variant.PRIMARY,
                                        forcedSmallCase: true,
                                        onClick: handleMain,
                                        isOnClick: true,
                                        hover: true,
                                    }}
                                />
                        ) : (
                            <PlainText
                                config={{
                                    size: 16,
                                    text: PathConfig.displayName,
                                    bold: false,
                                    variant: Variant.PRIMARY,
                                    forcedSmallCase: true,
                                    onClick: handleMain,
                                    isOnClick: true,
                                    hover: true,
                                }}
                            />
                        )}
                    </Link>
                ))}

            </ItemsContainer>

            <PlainText
                config={{
                    size: 16,
                    text: 'Контакты',
                    bold: true,
                    variant: Variant.PRIMARY,
                    forcedSmallCase: true,
                    hover: true,
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