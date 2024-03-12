import React from "react";
import { PageContainer } from "./Animals.styles";
import { StaffCollection } from "../modules/StaffFilter/StaffCollection";
import Filter from "../modules/StaffFilter/Filter";

export default function Staffs() {
    return (
        <PageContainer>
            <Filter/>
            <StaffCollection/>
        </PageContainer>
    );
}
