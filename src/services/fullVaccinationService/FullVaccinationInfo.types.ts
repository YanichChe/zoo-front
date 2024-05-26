export type FullVaccinationInfoDto = {
    rowNum: string;
    name: string;
    animalTitle: string;
    height: number;
    weight: number;
    vaccinationName: string;
    birthday: string;
    dateAppearance: string;
    dateDisappearance: string;
    age: number;
    cellNumber: string;
    _links: FullVaccinationInfoLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "full-vaccination-info": FullVaccinationInfoDto[];
    }
}

export type FullVaccinationInfoLinksDto = {
    self: {
        href: string;
    }
}

export type FullVaccinationInfo = {
    rowNum: string;
    name: string;
    animalTitle: string;
    height: number;
    weight: number;
    vaccinationName: string;
    birthday: string;
    dateAppearance: string;
    dateDisappearance: string;
    age: number;
    cellNumber: string;
}
