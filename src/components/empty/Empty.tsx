import { PlainText } from "../text/Text";
import { Variant } from "../../styles/tc/types";
import React from "react";
import styled from "styled-components";

export function Empty () {
const PageContainer = styled.div`
        height: 93vh;
        box-sizing: border-box;
        padding: 30px 70px;
    `

    return (
        <PageContainer>
            <PlainText
                config={{
                    size: 16,
                    text: 'Ничего не найдено :(',
                    bold: false,
                    variant: Variant.PRIMARY,
                    forcedSmallCase: true,
                    isOnClick: true,
                    hover: true,
                }}
            />
        </PageContainer>
    )
}