import React from "react";
import { PageContainer } from "./Animals.styles";
import Filter from "../modules/AnimalFilter/Filter";
import { AnimalsCollection } from "../modules/AnimalFilter/AnimalsCollection";

export default function Animals() {
    return (
        <PageContainer>
            <Filter/>
            <AnimalsCollection/>
        </PageContainer>
    );
}
