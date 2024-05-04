import React from "react";
import { PageContainer } from "./Animals.styles";
import { AnimalCreateWindow } from "../modules/AnimalCreator/AnimalCreateWindow";

export default function AnimalCreatePage() {
    return (
        <PageContainer>
            <AnimalCreateWindow />
        </PageContainer>
    );
}
