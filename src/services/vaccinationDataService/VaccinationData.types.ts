export type VaccinationDataDto = {
    rowNum: number;
    individualName: string;
    animalTitle: string;
    gender: string;
    age: string;
    vaccinationId: number;
    vaccinationName: string;
    dateAppearance: string;
    dateDisappearance: string;
    childrenCount: number;
    _links: VaccinationDataLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "vaccination-data": VaccinationDataDto[];
    }
}

export type VaccinationDataLinksDto = {
    self: {
        href: string;
    }
}

export type VaccinationData = {
    rowNum: number;
    individualName: string;
    animalTitle: string;
    gender: string;
    age: string;
    vaccinationId: number;
    vaccinationName: string;
    dateAppearance: string;
    dateDisappearance: string;
    childrenCount: number;
}
