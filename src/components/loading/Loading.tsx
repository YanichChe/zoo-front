import { BeatLoader } from "react-spinners";
import { Color } from "../../styles/tc/colors";
import React from "react";
import styled from "styled-components";

export function Loading() {

    const PageContainer = styled.div`
        height: 93vh;
        box-sizing: border-box;
        padding: 30px 70px;
    `

    return (
        <PageContainer>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '80vh',
                    width: '100%',
                }}
            >

                <BeatLoader color={Color.BUTTON_ACCENT_PRIMARY} size={16}/>
            </div>
        </PageContainer>
    )
}