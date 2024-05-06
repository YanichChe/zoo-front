import React from "react";
import { PageContainer } from "./Animals.styles";
import { StaffUpdateWindow } from "../modules/StaffUpdater/StaffUpdateWindow";

export default function StaffUpdatePage() {
    return (
        <PageContainer>
            <StaffUpdateWindow />
        </PageContainer>
    );
}