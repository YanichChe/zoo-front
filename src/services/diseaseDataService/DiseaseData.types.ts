export type DiseaseDataDto = {
    rowNum: string;
    individualName: string;
    animalTitle: string;
    gender: string;
    age: number;
    diseaseName: string;
    dateAppearance: string;
    dateDisappearance: string;
    diseaseHistoryDateStart: string;
    diseaseHistoryDateEnd: string;
    childrenCount: number;
    _links: DiseaseDataLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "disease-data": DiseaseDataDto[];
    }
}

export type DiseaseDataLinksDto = {
    self: {
        href: string;
    }
}

export type DiseaseData = {
    rowNum: string;
    individualName: string;
    animalTitle: string;
    gender: string;
    age: number;
    diseaseName: string;
    dateAppearance: string;
    dateDisappearance: string;
    diseaseHistoryDateStart: string;
    diseaseHistoryDateEnd: string;
    childrenCount: number;
}
