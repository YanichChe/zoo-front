import styled from "styled-components";
import background from '../assets/back.png'
import {Variant} from "../styles/tc/types";
import {PlainText} from "../components/text/Text";
import React from "react";
import doctor from '../assets/doctor.png'
import admin from '../assets/admin.png'
import {Color} from "../styles/tc/colors";

export default function StaffChoose() {
    const Container = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;
        width: 100vw;
        gap: 50px;
        height: 92vh;
        padding: 10px;
        text-align: center;
        box-sizing: border-box;
        overflow: auto;
    `

    const StaffContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        width: 40%;
        gap: 10px;
        height: 80%;
        padding: 10px;
        text-align: center;
        box-sizing: border-box;
        overflow: auto;

        &:hover {
            background: ${Color.HOVER};
        }
    `

    const Img = styled.img`
        height: 90%;
        width: 80%;
        margin: 0;
    `
    return (
        <Container>
            <StaffContainer>
                <Img src={admin} />
                <PlainText
                    config={{
                        size: 16,
                        text: 'Администратор',
                        bold: false,
                        variant: Variant.PRIMARY,
                        forcedSmallCase: true,
                    }}
                />
            </StaffContainer>
            <StaffContainer>
                <Img src={doctor} />
                <PlainText
                    config={{
                        size: 16,
                        text: 'Ветеринар',
                        bold: false,
                        variant: Variant.PRIMARY,
                        forcedSmallCase: true,
                    }}
                />
            </StaffContainer>
        </Container>
    )
}