import React from "react";
import { PageContainer } from "./Animals.styles";
import { AnimalUpdateWindow } from "../modules/AnimalUpdater/AnimalUpdateWindow";

export default function AnimalUpdatePage() {
    return (
        <PageContainer>
            <AnimalUpdateWindow />
        </PageContainer>
    );
}