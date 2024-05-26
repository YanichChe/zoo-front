export type FullDiseaseInfoDto = {
    rowNum: string;
    name: string;
    animalTitle: string;
    height: number;
    weight: number;
    diseaseName: string;
    birthday: string;
    dateAppearance: string;
    dateDisappearance: string;
    age: number;
    cellNumber: string;
    _links: FullDiseaseInfoLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "full-disease-info": FullDiseaseInfoDto[];
    }
}

export type FullDiseaseInfoLinksDto = {
    self: {
        href: string;
    }
}

export type FullDiseaseInfo = {
    rowNum: string;
    name: string;
    animalTitle: string;
    height: number;
    weight: number;
    diseaseName: string;
    birthday: string;
    dateAppearance: string;
    dateDisappearance: string;
    age: number;
    cellNumber: string;
}
